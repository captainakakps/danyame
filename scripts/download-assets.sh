#!/usr/bin/env bash
# Downloads all Figma-hosted assets into public/assets/
# Run from the project root: bash scripts/download-assets.sh

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BASE="$ROOT/public/assets"

download() {
  local url="$1"
  local dest="$2"
  local dir
  dir="$(dirname "$dest")"
  mkdir -p "$dir"
  # -L follow redirects, -f fail on HTTP errors, -s silent, -S show errors
  curl -L -f -s -S -o "$dest" "$url"
  echo "✓  $dest"
}

# ── Logo ──────────────────────────────────────────────────────────────────────
download "https://www.figma.com/api/mcp/asset/0076ab74-1d12-42d1-b9e0-63f59268713b" "$BASE/logo.png"

# ── Home ─────────────────────────────────────────────────────────────────────
download "https://www.figma.com/api/mcp/asset/e0b51964-710d-4db4-872c-fed1a7c1f1f7" "$BASE/home/hero-bg.jpg"
download "https://www.figma.com/api/mcp/asset/35bb2127-0840-48e3-b0f7-19b975474604" "$BASE/home/hero-star.svg"
download "https://www.figma.com/api/mcp/asset/72b2e952-f8da-4224-9ae8-b34a12cbeeec" "$BASE/home/hero-ellipse.svg"
download "https://www.figma.com/api/mcp/asset/3c7a81c5-a9c6-4e67-ab09-2170758bdb1a" "$BASE/home/hero-polygon.svg"
download "https://www.figma.com/api/mcp/asset/1ad6526f-c77e-4e90-9dfc-7fa6dd284cfa" "$BASE/home/hero-deco-chair.svg"
download "https://www.figma.com/api/mcp/asset/98f4ed72-9386-4a96-8a71-4806aa3a405e" "$BASE/home/hero-deco-group-1.svg"
download "https://www.figma.com/api/mcp/asset/e7bd1c6c-0ec3-4ee6-8ba8-606b5716c1b9" "$BASE/home/hero-deco-group-2.svg"
download "https://www.figma.com/api/mcp/asset/72bcd3bb-10fc-4227-a43f-d1d05565db91" "$BASE/home/hero-deco-notes.svg"
download "https://www.figma.com/api/mcp/asset/1c93e0d2-1ab2-45a9-9e8f-8b0ed0f0faba" "$BASE/home/hero-deco-mic.svg"
download "https://www.figma.com/api/mcp/asset/24a18d2b-d290-4a43-96bb-f853e527d670" "$BASE/home/hero-deco-note-2.svg"
download "https://www.figma.com/api/mcp/asset/27734f2a-4ab4-4fc9-83db-b962416029d8" "$BASE/home/hero-deco-note-3.svg"
# Fix Figma SVG var() fills after download
for f in "$BASE"/home/hero-*.svg; do
  sed -i '' 's/fill="var(--fill-0, \([^)]*\))"/fill="\1"/g' "$f" 2>/dev/null || \
  sed -i 's/fill="var(--fill-0, \([^)]*\))"/fill="\1"/g' "$f"
done
download "https://www.figma.com/api/mcp/asset/c4bb7072-de4c-43b4-93e5-b8cb8a7ea27b" "$BASE/home/about-building.jpg"
download "https://www.figma.com/api/mcp/asset/347bc496-6c5a-4051-b158-4505f816d4a9" "$BASE/home/event-thumb.jpg"
download "https://www.figma.com/api/mcp/asset/ec29780c-92dd-4a99-8173-db9f843cc028" "$BASE/home/gallery-1.jpg"
download "https://www.figma.com/api/mcp/asset/2c14bcbb-567a-489c-8407-6803cda79c93" "$BASE/home/gallery-2.jpg"
download "https://www.figma.com/api/mcp/asset/9e423949-d883-49db-ae59-b21ec0ce2674" "$BASE/home/gallery-3.jpg"
download "https://www.figma.com/api/mcp/asset/9fd23445-d144-4d62-9c0a-755790486982" "$BASE/home/gallery-4.jpg"
download "https://www.figma.com/api/mcp/asset/552a9b27-ce29-4cd6-8151-431eabf84d14" "$BASE/home/gallery-5.jpg"
download "https://www.figma.com/api/mcp/asset/f9596500-f989-4897-a8f0-b13466f35c82" "$BASE/home/gallery-6.jpg"
download "https://www.figma.com/api/mcp/asset/0c20e54c-9d57-42b6-ac0a-9bee9e2f0fe1" "$BASE/home/gallery-7.jpg"

# ── Experiences ───────────────────────────────────────────────────────────────
download "https://www.figma.com/api/mcp/asset/9a4da752-346e-4c91-b5aa-0416f174f1c6" "$BASE/experiences/hero.jpg"
download "https://www.figma.com/api/mcp/asset/50f93216-bd9f-4777-a49b-3f9800333988" "$BASE/experiences/events.jpg"
download "https://www.figma.com/api/mcp/asset/785ffa3d-da44-4cba-806e-f2970b7693ab" "$BASE/experiences/pool.jpg"
download "https://www.figma.com/api/mcp/asset/f41f5db0-2c7f-4197-ba6c-5f714486f84b" "$BASE/experiences/food.jpg"
download "https://www.figma.com/api/mcp/asset/1de471ff-6357-4f43-a1b2-70621f8199b2" "$BASE/experiences/games.jpg"

# ── Gallery – decoration ──────────────────────────────────────────────────────
download "https://www.figma.com/api/mcp/asset/912d7b9a-e7f3-4935-9159-3f4e7b7706fd" "$BASE/gallery/star-decoration.png"

# ── Gallery – Events tab ──────────────────────────────────────────────────────
download "https://www.figma.com/api/mcp/asset/875b1963-072f-4863-a87f-3756fad25c8d" "$BASE/gallery/events/1.jpg"
download "https://www.figma.com/api/mcp/asset/63b8f9df-92ac-4052-997e-693228855fc5" "$BASE/gallery/events/2.jpg"
download "https://www.figma.com/api/mcp/asset/c7e2dd52-1941-43c6-b4e1-092014221b89" "$BASE/gallery/events/3.jpg"
download "https://www.figma.com/api/mcp/asset/349a1db6-77af-4f1a-a945-d1ed4819434e" "$BASE/gallery/events/4.jpg"
download "https://www.figma.com/api/mcp/asset/47025aac-4c18-42df-8d92-c8ffe187ff3e" "$BASE/gallery/events/5.jpg"
download "https://www.figma.com/api/mcp/asset/ffaf40af-15d5-40bd-bb35-5fa1eb457e8f" "$BASE/gallery/events/6.jpg"
download "https://www.figma.com/api/mcp/asset/6063ec1d-aa39-49b1-837a-0188d3d748e4" "$BASE/gallery/events/7.jpg"

# ── Gallery – Pool tab ────────────────────────────────────────────────────────
download "https://www.figma.com/api/mcp/asset/f478cafa-62c8-4431-927d-049a6f6e0e12" "$BASE/gallery/pool/1.jpg"
download "https://www.figma.com/api/mcp/asset/7ca462c2-de01-46c4-ae59-356a430c58e9" "$BASE/gallery/pool/2.jpg"
download "https://www.figma.com/api/mcp/asset/ea87e1cd-4e27-4600-a20a-15be20c51220" "$BASE/gallery/pool/3.jpg"
download "https://www.figma.com/api/mcp/asset/aec19110-bba7-4973-bad1-e1d230769f07" "$BASE/gallery/pool/4.jpg"
download "https://www.figma.com/api/mcp/asset/d0f7abf4-bfc7-4c80-808e-bc8ecfd00482" "$BASE/gallery/pool/5.jpg"
download "https://www.figma.com/api/mcp/asset/d522d7d8-b826-40fd-85c5-3cb5d041d7b6" "$BASE/gallery/pool/6.jpg"
download "https://www.figma.com/api/mcp/asset/4e129da5-ee13-4932-9bcc-0d72551517b8" "$BASE/gallery/pool/7.jpg"

# ── About ─────────────────────────────────────────────────────────────────────
download "https://www.figma.com/api/mcp/asset/1ca962f2-24b5-4a5c-9fea-d820c281f527" "$BASE/about/hero.jpg"
download "https://www.figma.com/api/mcp/asset/229d0e5e-0201-410b-a06b-432f9579ce71" "$BASE/about/quote-bg.jpg"
download "https://www.figma.com/api/mcp/asset/ce2a231b-ec80-4095-9ad7-2674ef949a14" "$BASE/about/quote-icon.png"
download "https://www.figma.com/api/mcp/asset/449b8855-08a5-4a21-8530-e3bdd185809d" "$BASE/about/strip-1.jpg"
download "https://www.figma.com/api/mcp/asset/f06dc4c7-984b-4507-9f32-2ca17df90bdb" "$BASE/about/strip-2.jpg"
download "https://www.figma.com/api/mcp/asset/398c0759-508e-4029-aa79-3607d2e2b06a" "$BASE/about/strip-3.jpg"
download "https://www.figma.com/api/mcp/asset/e7d7ae21-cd56-4489-a8d0-1d65356ff465" "$BASE/about/strip-4.jpg"
download "https://www.figma.com/api/mcp/asset/a4afbe7c-0051-42f3-90f3-26518d454930" "$BASE/about/strip-5.jpg"

echo ""
echo "All 39 assets downloaded."
