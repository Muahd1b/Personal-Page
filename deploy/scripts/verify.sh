#!/usr/bin/env bash

set -Eeuo pipefail

readonly app_dir=${PERSONAL_PAGE_APP_DIR:-/srv/kernscale/apps/personal-page}
readonly compose_file=${PERSONAL_PAGE_COMPOSE_FILE:-${app_dir}/compose.yaml}
readonly image_file=${PERSONAL_PAGE_IMAGE_FILE:-${app_dir}/image.env}

public_check=false
if [[ ${1:-} == "--public" ]]; then
  public_check=true
elif [[ $# -ne 0 ]]; then
  echo "Usage: $0 [--public]" >&2
  exit 64
fi

read_image() {
  local file=$1
  local line

  [[ -f "$file" ]] || {
    echo "Image environment file is missing: ${file}" >&2
    return 1
  }

  [[ $(grep -c '^PERSONAL_PAGE_IMAGE=' "$file") -eq 1 ]] || {
    echo "Image environment file must contain exactly one PERSONAL_PAGE_IMAGE entry." >&2
    return 1
  }

  line=$(grep '^PERSONAL_PAGE_IMAGE=' "$file")
  printf '%s\n' "${line#PERSONAL_PAGE_IMAGE=}"
}

expected_image=$(read_image "$image_file")
[[ "$expected_image" =~ ^ghcr\.io/muahd1b/personal-page@sha256:[0-9a-f]{64}$ ]] || {
  echo "PERSONAL_PAGE_IMAGE is not an approved immutable GHCR digest." >&2
  exit 1
}

cd "$app_dir"
docker compose --env-file "$image_file" -f "$compose_file" config --quiet

container_id=$(docker compose --env-file "$image_file" -f "$compose_file" ps -q app)
[[ -n "$container_id" ]] || {
  echo "Personal Page container is not running." >&2
  exit 1
}

running_image=$(docker inspect --format '{{.Config.Image}}' "$container_id")
[[ "$running_image" == "$expected_image" ]] || {
  echo "Running image does not match the selected immutable digest." >&2
  exit 1
}

[[ $(docker inspect --format '{{.State.Status}}' "$container_id") == "running" ]]
[[ $(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{end}}' "$container_id") == "healthy" ]]
[[ -z $(docker port "$container_id") ]] || {
  echo "Personal Page unexpectedly publishes a host port." >&2
  exit 1
}

docker compose --env-file "$image_file" -f "$compose_file" exec -T app \
  node -e "fetch('http://127.0.0.1:3000/api/health').then(async response => { console.log(response.status, await response.text()); if (!response.ok) process.exit(1); }).catch(() => process.exit(1))"

docker compose --env-file "$image_file" -f "$compose_file" exec -T app \
  node -e "require('node:http').get({ host: 'traefik', port: 80, path: '/', headers: { Host: 'jonasknppel.me' } }, response => { console.log(response.statusCode); process.exit(response.statusCode >= 200 && response.statusCode < 300 ? 0 : 1); }).on('error', () => process.exit(1))"

if "$public_check"; then
  curl --fail --silent --show-error --max-time 15 https://jonasknppel.me/api/health
  curl --fail --silent --show-error --max-time 15 --output /dev/null https://jonasknppel.me/
fi

printf 'verified image=%s container=%s\n' "$expected_image" "$container_id"
