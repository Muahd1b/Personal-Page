#!/usr/bin/env bash

set -Eeuo pipefail

[[ $# -eq 3 ]] || {
  echo "Usage: $0 <immutable-image> <commit-sha> <actor>" >&2
  exit 64
}

readonly app_dir=${PERSONAL_PAGE_APP_DIR:-/srv/kernscale/apps/personal-page}
readonly image=$1
readonly commit=$2
readonly actor=$3
readonly lock_file="${app_dir}/.deploy.lock"
readonly staged_compose="${app_dir}/compose.yaml.next"
readonly verify_script="${app_dir}/bin/verify.sh"

[[ "$image" =~ ^ghcr\.io/muahd1b/personal-page@sha256:[0-9a-f]{64}$ ]] || {
  echo "Image must be the Personal Page GHCR package at an immutable sha256 digest." >&2
  exit 64
}
[[ "$commit" =~ ^[0-9a-f]{40}$ ]] || {
  echo "Commit must be a complete lowercase Git SHA." >&2
  exit 64
}
[[ "$actor" =~ ^[A-Za-z0-9_.@-]+$ ]] || {
  echo "Actor contains unsupported characters." >&2
  exit 64
}
[[ -x "$verify_script" ]] || {
  echo "Verification script is missing or not executable." >&2
  exit 1
}

umask 077
mkdir -p "${app_dir}/releases"
exec 9>"$lock_file"
flock -n 9 || {
  echo "Another Personal Page deployment is active." >&2
  exit 75
}

timestamp=$(date -u +%Y%m%dT%H%M%SZ)
release_dir="${app_dir}/releases/${timestamp}-${commit:0:7}"
candidate_image=$(mktemp "${app_dir}/.image.env.XXXXXX")
mkdir -m 750 "$release_dir"
printf 'PERSONAL_PAGE_IMAGE=%s\n' "$image" >"$candidate_image"
chmod 600 "$candidate_image"

compose_source="${app_dir}/compose.yaml"
if [[ -f "$staged_compose" ]]; then
  compose_source=$staged_compose
fi

cp "$candidate_image" "${release_dir}/image.env"
cp "$compose_source" "${release_dir}/compose.yaml"

metadata="${release_dir}/metadata.txt"
{
  printf 'repository=Muahd1b/Personal-Page\n'
  printf 'commit=%s\n' "$commit"
  printf 'image=%s\n' "$image"
  printf 'actor=%s\n' "$actor"
  printf 'target=kernscale-rs2000\n'
  printf 'started_at=%s\n' "$timestamp"
  printf 'status=starting\n'
} >"$metadata"

had_previous=false
promoted=false
if [[ -f "${app_dir}/image.env" && -f "${app_dir}/compose.yaml" ]]; then
  PERSONAL_PAGE_IMAGE_FILE="${app_dir}/image.env" \
    PERSONAL_PAGE_COMPOSE_FILE="${app_dir}/compose.yaml" \
    "$verify_script"
  had_previous=true
  cp "${app_dir}/image.env" "${release_dir}/previous-image.env"
  cp "${app_dir}/compose.yaml" "${release_dir}/previous-compose.yaml"
  install -m 600 "${app_dir}/image.env" "${app_dir}/last-known-good.env"
  install -m 640 "${app_dir}/compose.yaml" "${app_dir}/last-known-good-compose.yaml"
fi

rollback_on_error() {
  local status=$?
  trap - ERR
  printf 'status=failed\nfailed_at=%s\n' "$(date -u +%Y%m%dT%H%M%SZ)" >>"$metadata"

  if "$promoted" && "$had_previous"; then
    install -m 600 "${release_dir}/previous-image.env" "${app_dir}/image.env"
    install -m 640 "${release_dir}/previous-compose.yaml" "${app_dir}/compose.yaml"
    if (
      cd "$app_dir"
      docker compose --env-file image.env -f compose.yaml up -d --wait --wait-timeout 90
      "$verify_script" --public
    ); then
      printf 'rollback_result=healthy\n' >>"$metadata"
    else
      printf 'rollback_result=failed\n' >>"$metadata"
    fi
  else
    printf 'rollback_result=not_available\n' >>"$metadata"
  fi

  rm -f "$candidate_image"
  exit "$status"
}
trap rollback_on_error ERR

docker compose --env-file "$candidate_image" -f "$compose_source" config --quiet
docker compose --env-file "$candidate_image" -f "$compose_source" pull
image_commit=$(docker image inspect --format '{{index .Config.Labels "org.opencontainers.image.revision"}}' "$image")
[[ "$image_commit" == "$commit" ]] || {
  echo "Image provenance label does not match the selected commit." >&2
  exit 1
}

if [[ "$compose_source" != "${app_dir}/compose.yaml" ]]; then
  install -m 640 "$compose_source" "${app_dir}/compose.yaml"
fi
install -m 600 "$candidate_image" "${app_dir}/image.env"
promoted=true
rm -f "$staged_compose"

cd "$app_dir"
docker compose --env-file image.env -f compose.yaml up -d --wait --wait-timeout 90
"$verify_script" --public

{
  printf 'status=healthy\n'
  printf 'health_result=passed\n'
  printf 'completed_at=%s\n' "$(date -u +%Y%m%dT%H%M%SZ)"
} >>"$metadata"

rm -f "$candidate_image"
trap - ERR
printf 'deployed %s\n' "$image"
