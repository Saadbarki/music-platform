#!/bin/bash

# Source folder (Windows Downloads/Songs)
SOURCE="/mnt/c/Users/SAAD/Downloads/Songs"
# Destination folder (Backend mp3s)
DEST="$HOME/music-platform/backend/MusicService/mp3s"

echo "Syncing songs from $SOURCE to $DEST..."

# Clear existing mp3s (optional - remove this line if you want to keep old songs)
# rm -f "$DEST"/*.mp3

# Copy all mp3 files
cp "$SOURCE"/*.mp3 "$DEST/" 2>/dev/null || echo "No mp3 files found in source"

echo "Sync complete!"
echo "Files in destination:"
ls -lh "$DEST"/*.mp3 | wc -l
