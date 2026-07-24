#!/usr/bin/env bash

set -Eeuo pipefail

readonly app_dir=${PERSONAL_PAGE_APP_DIR:-/srv/kernscale/apps/personal-page}
readonly lock_file="${app_dir}/.deploy.lock"
readonly verify_script="${app_dir}/bin/verify.sh"

[[ $# -eq 0 ]] || {
  echo "Usage: $0" >&2
  exit 64
}
[[ -f "${app_dir}/last-known-good.env" ]] || {
  echo "No last-known-good image is available." >&2
  exit 1
}
[[ -x "$verify_script" ]] || {
  echo "Verification script is missing or not executable." >&2
  exit 1
}

umask 077
exec 9>"$lock_file"
flock -n 9 || {
  echo "Another Personal Page deployment is active." >&2
  exit 75
}

timestamp=$(date -u +%Y%m%dT%H%M%SZ)
release_dir="${app_dir}/releases/${timestamp}-rollback"
mkdir -m 750 "$release_dir"
cp "${app_dir}/image.env" "${release_dir}/replaced-image.env"
cp "${app_dir}/compose.yaml" "${release_dir}/replaced-compose.yaml"

install -m 600 "${app_dir}/last-known-good.env" "${app_dir}/image.env"
if [[ -f "${app_dir}/last-known-good-compose.yaml" ]]; then
  install -m 640 "${app_dir}/last-known-good-compose.yaml" "${app_dir}/compose.yaml"
fi

cd "$app_dir"
docker compose --env-file image.env -f compose.yaml config --quiet
docker compose --env-file image.env -f compose.yaml pull
docker compose --env-file image.env -f compose.yaml up -d --wait --wait-timeout 90
"$verify_script" --public

{
  printf 'repository=Muahd1b/Personal-Page\n'
  printf 'actor=%s\n' "${GITHUB_ACTOR:-manual-operator}"
  printf 'target=kernscale-rs2000\n'
  printf 'started_at=%s\n' "$timestamp"
  printf 'status=healthy\n'
  printf 'rollback_result=passed\n'
  printf 'completed_at=%s\n' "$(date -u +%Y%m%dT%H%M%SZ)"
} >"${release_dir}/metadata.txt"

printf 'rollback completed\n'
