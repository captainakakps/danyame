#!/bin/bash
# Optimize images for web performance (macOS sips)
# Backs up originals to public/assets/_originals/ before modifying

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ASSETS_DIR="$(cd "$SCRIPT_DIR/../public/assets" && pwd)"
BACKUP_DIR="$ASSETS_DIR/_originals"
JPEG_QUALITY=80

mkdir -p "$BACKUP_DIR"

backup_file() {
  local file="$1"
  local backup_subdir="$2"
  local filename
  filename="$(basename "$file")"
  local dest="$BACKUP_DIR/$backup_subdir"

  mkdir -p "$dest"

  if [ ! -f "$dest/$filename" ]; then
    cp "$file" "$dest/$filename"
  fi
}

optimize_jpg() {
  local file="$1"
  local max_width="$2"
  local backup_subdir="$3"

  backup_file "$file" "$backup_subdir"

  local current_width
  current_width=$(sips -g pixelWidth "$file" 2>/dev/null | tail -1 | awk '{print $2}')

  if [ -n "$current_width" ] && [ "$current_width" -gt "$max_width" ]; then
    echo "  Resize $(basename "$file"): ${current_width}px -> ${max_width}px"
    sips --resampleWidth "$max_width" "$file" > /dev/null 2>&1
  fi

  sips -s format jpeg -s formatOptions "$JPEG_QUALITY" "$file" > /dev/null 2>&1
}

optimize_png() {
  local file="$1"
  local max_dimension="$2"
  local backup_subdir="$3"

  backup_file "$file" "$backup_subdir"

  local current_width
  current_width=$(sips -g pixelWidth "$file" 2>/dev/null | tail -1 | awk '{print $2}')

  if [ -n "$current_width" ] && [ "$current_width" -gt "$max_dimension" ]; then
    echo "  Resize $(basename "$file"): max ${max_dimension}px"
    sips -Z "$max_dimension" "$file" > /dev/null 2>&1
  fi
}

optimize_dir_jpgs() {
  local dir="$1"
  local max_width="$2"
  local backup_subdir="$3"

  if [ ! -d "$dir" ]; then
    return
  fi

  echo "--- $backup_subdir (max ${max_width}px) ---"

  shopt -s nullglob
  for img in "$dir"/*.jpg; do
    optimize_jpg "$img" "$max_width" "$backup_subdir"
  done
  shopt -u nullglob
}

optimize_tree_jpgs() {
  local root="$1"
  local max_width="$2"
  local backup_prefix="$3"

  if [ ! -d "$root" ]; then
    return
  fi

  while IFS= read -r img; do
    local rel="${img#$ASSETS_DIR/}"
    local subdir="$backup_prefix/$(dirname "$rel")"
    optimize_jpg "$img" "$max_width" "$subdir"
  done < <(find "$root" -name "*.jpg" -not -path "*/_originals/*" | sort)
}

echo "=== Danyame Image Optimization ==="
echo "Assets: $ASSETS_DIR"
echo ""

BEFORE_SIZE=$(du -sh "$ASSETS_DIR" | awk '{print $1}')
echo "Total size before: $BEFORE_SIZE"
echo ""

echo "Hero & page backgrounds (1920px)"
optimize_dir_jpgs "$ASSETS_DIR/home" 1920 "home"
optimize_dir_jpgs "$ASSETS_DIR/about" 1920 "about"
optimize_dir_jpgs "$ASSETS_DIR/experiences" 1920 "experiences"
optimize_dir_jpgs "$ASSETS_DIR/events" 1920 "events"
optimize_dir_jpgs "$ASSETS_DIR/attend-event" 1920 "attend-event"

echo ""
echo "Gallery grids (1200px)"
optimize_tree_jpgs "$ASSETS_DIR/gallery" 1200 "gallery"

echo ""
echo "Logos (PNG)"
if [ -f "$ASSETS_DIR/logo.png" ]; then
  optimize_png "$ASSETS_DIR/logo.png" 208 "logos"
fi
if [ -f "$ASSETS_DIR/logo-dark.png" ]; then
  optimize_png "$ASSETS_DIR/logo-dark.png" 208 "logos"
fi

echo ""
AFTER_SIZE=$(du -sh "$ASSETS_DIR" | awk '{print $1}')
echo "=== Complete ==="
echo "Total size after:  $AFTER_SIZE"
echo "Originals backed up to: $BACKUP_DIR"
echo ""
echo "Largest remaining JPGs:"
find "$ASSETS_DIR" -name "*.jpg" -not -path "*/_originals/*" -exec du -h {} + 2>/dev/null | sort -hr | head -10
