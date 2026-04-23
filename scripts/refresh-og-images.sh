#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT_DIR/assets/projects"

mkdir -p "$OUT_DIR"

# slug|open_graph_url
PROJECTS=(
  "deliberate-decoding|https://opengraph.githubassets.com/1/ellenchart/deliberateDecoding.github.io"
  "developer-portfolio|https://opengraph.githubassets.com/1/ellenchart/ellenchart.github.io"
  "mips-emulator|https://opengraph.githubassets.com/1/ellenchart/CMSC301_Project"
  "project-jellen|https://opengraph.githubassets.com/1/cmsc240-s24/project-jellen"
)

download_one() {
  local slug="$1"
  local url="$2"
  local out="$OUT_DIR/${slug}.png"
  local tmp
  tmp="$(mktemp)"

  # Use a timestamped path segment to reduce stale caches while still pulling from Open Graph.
  local repo_path
  repo_path="${url#https://opengraph.githubassets.com/1/}"
  local seeded_url="https://opengraph.githubassets.com/$(date +%s)/${repo_path}"

  if curl -fL --retry 2 --retry-delay 1 -A "Mozilla/5.0" "$seeded_url" -o "$tmp"; then
    if file -b --mime-type "$tmp" | grep -q '^image/'; then
      mv "$tmp" "$out"
      echo "updated: ${slug}.png"
      return 0
    fi
  fi

  rm -f "$tmp"
  echo "skipped: ${slug}.png (Open Graph unavailable/rate-limited)"
  return 1
}

failures=0
for entry in "${PROJECTS[@]}"; do
  slug="${entry%%|*}"
  url="${entry#*|}"
  if ! download_one "$slug" "$url"; then
    failures=$((failures + 1))
  fi
done

echo
echo "Local Open Graph cache status:"
ls -lh "$OUT_DIR"

if [[ "$failures" -gt 0 ]]; then
  echo
  echo "Completed with ${failures} warning(s). Existing local images were preserved."
fi
