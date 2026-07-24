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
├── bin/
│   ├── deploy.sh
│   ├── ci-command.sh
│   ├── rollback.sh
│   └── verify.sh
├── compose.yaml
├── image.env
├── last-known-good.env
├── last-known-good-compose.yaml
└── releases/
```

`image.env` and `last-known-good.env` must be mode `600`. Each image value must
contain a complete immutable GHCR digest; mutable tags such as `latest` are not
valid release identities.

## Manual deployment workflow

Production releases run through `.github/workflows/deploy.yml`, the protected
GitHub `production` environment, a tagged ephemeral Tailscale runner, and a
dedicated SSH identity for the restricted `deploy` account. The workflow
accepts only an explicit GHCR digest and the full trusted `main` commit SHA.

Required GitHub environment secrets:

```text
TS_OAUTH_CLIENT_ID
TS_AUDIENCE
DEPLOY_SSH_PRIVATE_KEY
DEPLOY_SSH_KNOWN_HOSTS
```

The Tailscale service identity must receive only `tag:github-deploy`, and the
tailnet policy must permit that tag to reach TCP port `22` on
`kernscale-rs2000`. Require a human reviewer on the GitHub `production`
environment.

Install the CI public key with a forced command and OpenSSH's `restrict`
option:

```text
restrict,command="/srv/kernscale/apps/personal-page/bin/ci-command.sh" ssh-ed25519 <public-key> github-personal-page-production
```

The forced command accepts only
`deploy <immutable-personal-page-image> <full-commit-sha> <actor>`. It rejects
shell access, port forwarding, PTYs, file transfer, other repositories, mutable
tags, and extra arguments. Installing or updating the Compose contract and
release scripts remains a separate, operator-reviewed server operation; the CI
identity cannot modify its own deployment tooling.

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

Production deployment requires release authorization. The installed command is:

```bash
bin/deploy.sh \
  ghcr.io/muahd1b/personal-page@sha256:<approved-digest> \
  <full-main-commit-sha> \
  <operator>
bin/verify.sh --public
```

`deploy.sh` takes an exclusive lock, validates the candidate Compose contract,
records the release, promotes the selected digest, performs bounded health
checks, and automatically restores the preceding image and Compose definition
if deployment or verification fails.

After Cloudflare cutover, verify the public homepage, `/api/health`,
`/robots.txt`, and `/sitemap.xml`, then confirm the Uptime Kuma monitor is up.

## Rollback

Rollback restores the last-known-good digest and Compose definition, not a
mutable tag:

```bash
bin/rollback.sh
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
