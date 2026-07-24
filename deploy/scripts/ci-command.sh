#!/usr/bin/env bash

set -Eeuo pipefail

readonly APP_DIR="/srv/kernscale/apps/personal-page"
readonly ORIGINAL_COMMAND="${SSH_ORIGINAL_COMMAND:-}"

read -r operation image commit actor extra <<<"${ORIGINAL_COMMAND}"

if [[ "${operation:-}" != "deploy" || -z "${image:-}" || -z "${commit:-}" ||
  -z "${actor:-}" || -n "${extra:-}" ]]; then
  echo "Only an immutable Personal Page deployment is permitted." >&2
  exit 64
fi

if [[ ! "${image}" =~ ^ghcr\.io/muahd1b/personal-page@sha256:[0-9a-f]{64}$ ]]; then
  echo "The image must be the approved Personal Page GHCR digest." >&2
  exit 64
fi

if [[ ! "${commit}" =~ ^[0-9a-f]{40}$ ]]; then
  echo "The release commit must be a full Git SHA." >&2
  exit 64
fi

if [[ ! "${actor}" =~ ^[A-Za-z0-9_.@-]+$ ]]; then
  echo "The release actor is invalid." >&2
  exit 64
fi

exec "${APP_DIR}/bin/deploy.sh" "${image}" "${commit}" "${actor}"
