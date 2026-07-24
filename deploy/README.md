# Personal Page production contract

The production application lives at `/srv/kernscale/apps/personal-page` and is
operated by the restricted `deploy` account. Development checkouts must never
serve production traffic.

## Runtime

- Image: `ghcr.io/muahd1b/personal-page@sha256:<approved-digest>`
- Internal port: `3000`
- Readiness: `GET /api/health`
- Public hostname: `jonasknppel.me`
- Redirect: `www.jonasknppel.me` to `https://jonasknppel.me`
- Network: external Docker network `kernscale-edge`
- Persistent state: none
- Runtime secrets: none

The application publishes no host port. Cloudflare Tunnel forwards the original
Host header to Traefik, which routes only the two declared hostnames.

## Server files

```text
/srv/kernscale/apps/personal-page/
├── compose.yaml
├── image.env
├── last-known-good.env
└── releases/
```

`image.env` and `last-known-good.env` must be mode `600`. Each image value must
contain a complete immutable GHCR digest; mutable tags such as `latest` are not
valid release identities.

## Pre-release

From `/srv/kernscale/apps/personal-page`:

```bash
docker compose --env-file image.env -f compose.yaml config --quiet
docker compose --env-file image.env -f compose.yaml pull
```

Before replacing a healthy release, copy its exact `image.env` to
`last-known-good.env` and record the repository, commit, digest, operator, and
start time below `releases/`.

## Deploy and verify

Production deployment requires release authorization:

```bash
docker compose --env-file image.env -f compose.yaml up -d --wait --wait-timeout 90
docker compose --env-file image.env -f compose.yaml ps
docker compose --env-file image.env -f compose.yaml exec -T app \
  node -e "fetch('http://127.0.0.1:3000/api/health').then(async r => { console.log(r.status, await r.text()); if (!r.ok) process.exit(1); }).catch(() => process.exit(1))"
docker compose --env-file image.env -f compose.yaml exec -T app \
  node -e "fetch('http://traefik/', { headers: { Host: 'jonasknppel.me' } }).then(r => { console.log(r.status); if (!r.ok) process.exit(1); }).catch(() => process.exit(1))"
```

After Cloudflare cutover, verify the public homepage, `/api/health`,
`/robots.txt`, and `/sitemap.xml`, then confirm the Uptime Kuma monitor is up.

## Rollback

Rollback restores the last-known-good digest, not a mutable tag:

```bash
cp last-known-good.env image.env
chmod 600 image.env
docker compose --env-file image.env -f compose.yaml config --quiet
docker compose --env-file image.env -f compose.yaml pull
docker compose --env-file image.env -f compose.yaml up -d --wait --wait-timeout 90
```

Repeat both private health checks after rollback. If the application remains
unhealthy, point the Cloudflare web route back to the retained LiteSpeed origin
at `162.0.217.221`; do not change Zoho mail records.

## Backup and recovery

There is no database, queue, upload directory, or other application-persistent
state. Restic must include the Compose definition, release records, `image.env`,
and `last-known-good.env`. Recovery consists of restoring those files, pulling
the recorded digest from GHCR, starting the container, and repeating the health
checks.
