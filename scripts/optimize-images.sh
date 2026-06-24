#!/bin/bash
# Optimize images for web performance
# Uses sips (macOS built-in) to resize images

ASSETS_DIR="/Users/brightakakpo/Documents/Projects/danyame/public/assets"

echo "=== Image Optimization Script ==="
echo "Backing up originals..."

# Create backup directory
mkdir -p "$ASSETS_DIR/_originals"

# Function to optimize images in a directory
optimize_dir() {
    local dir="$1"
    local max_width="$2"
    local backup_subdir="$3"
    
    if [ ! -d "$dir" ]; then
        return
    fi
    
    mkdir -p "$ASSETS_DIR/_originals/$backup_subdir"
    
    for img in "$dir"/*.jpg; do
        if [ -f "$img" ]; then
            filename=$(basename "$img")
            
            # Backup original
            if [ ! -f "$ASSETS_DIR/_originals/$backup_subdir/$filename" ]; then
                cp "$img" "$ASSETS_DIR/_originals/$backup_subdir/$filename"
            fi
            
            # Get current width
            current_width=$(sips -g pixelWidth "$img" | tail -1 | awk '{print $2}')
            
            if [ "$current_width" -gt "$max_width" ]; then
                echo "Resizing $filename: ${current_width}px -> ${max_width}px"
                sips --resampleWidth "$max_width" "$img" > /dev/null 2>&1
            fi
        fi
    done
}

# Hero images: max 1920px wide
echo ""
echo "--- Optimizing hero images (max 1920px) ---"
optimize_dir "$ASSETS_DIR/home" 1920 "home"
optimize_dir "$ASSETS_DIR/about" 1920 "about"
optimize_dir "$ASSETS_DIR/experiences" 1920 "experiences"

# Gallery images: max 1200px wide (they're shown smaller)
echo ""
echo "--- Optimizing gallery images (max 1200px) ---"
optimize_dir "$ASSETS_DIR/gallery/events" 1200 "gallery-events"
optimize_dir "$ASSETS_DIR/gallery/pool" 1200 "gallery-pool"

echo ""
echo "=== Optimization complete ==="
echo ""
echo "New file sizes:"
find "$ASSETS_DIR" -name "*.jpg" -not -path "*/_originals/*" -exec ls -lh {} \; | awk '{print $5, $9}'
