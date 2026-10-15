#!/usr/bin/env bash
# Rebuilds the demo snapshots in public/play/ (see public/play/index.html).
# Each step is the app + docs exactly as they were at one commit of the real build.
# Run from the repo root with full history: git fetch --depth=200 origin main && scripts/build-play.sh
set -euo pipefail

STEPS=(6d30483 6c36bf8 bc6ec54 2c370e6 1d3c050)
ROOT=$(pwd)
OUT="$ROOT/public/play"
TMP=$(mktemp -d)

rm -rf "$OUT"/s*
for i in "${!STEPS[@]}"; do
  sha=${STEPS[$i]}
  wt="$TMP/s$i"
  git worktree add --detach "$wt" "$sha" >/dev/null
  ln -s "$ROOT/node_modules" "$wt/node_modules"
  (
    cd "$wt"
    # Presenter-only and later-phase docs stay off stage.
    rm -f docs/demo-notes.md docs/plan.md
    node "$ROOT/scripts/build-docs.mjs"
    BASE_PATH=./ BUILD_ID="demo-$sha" npx vite build --outDir "$OUT/s$i" --emptyOutDir >/dev/null
  )
  git worktree remove --force "$wt"
  echo "s$i ← $sha"
done
rm -rf "$TMP"
