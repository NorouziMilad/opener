#!/bin/bash

# -----------------------------------------------
# Installer for opener CLI (Home directory, no sudo)
# -----------------------------------------------

REPO="https://github.com/NorouziMilad/opener.git"
DEST="$HOME/.local/opener"
DATA_DIR="$HOME/.opener"
GLOBAL_BIN="$HOME/.local/bin"

# Ensure global bin and data directory exist
mkdir -p "$GLOBAL_BIN"
mkdir -p "$DATA_DIR"

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Install from https://nodejs.org/"
  exit 1
fi

# Clone repo if not exist
if [ -d "$DEST" ]; then
  echo "⚠️  Directory $DEST already exists. Skipping clone."
else
  echo "📥 Cloning repository into $DEST..."
  git clone $REPO "$DEST" || { echo "❌ Failed to clone repository"; exit 1; }
fi

cd "$DEST" || { echo "❌ Failed to access directory $DEST"; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
npm install || { echo "❌ npm install failed"; exit 1; }

# Configure npm prefix to home
npm config set prefix "$HOME/.local"

# Link CLI
echo "🔗 Linking CLI commands..."
npm link || { echo "❌ npm link failed"; exit 1; }

# Detect shell profile
SHELL_PROFILE=""
if [ -n "$ZSH_VERSION" ]; then
  SHELL_PROFILE="$HOME/.zshrc"
elif [ -n "$BASH_VERSION" ]; then
  SHELL_PROFILE="$HOME/.bashrc"
fi

# Add GLOBAL_BIN to PATH if not present
if ! echo "$PATH" | grep -q "$GLOBAL_BIN"; then
  echo "✅ Adding $GLOBAL_BIN to PATH in $SHELL_PROFILE"
  echo "export PATH=\"$GLOBAL_BIN:\$PATH\"" >> "$SHELL_PROFILE"
  export PATH="$GLOBAL_BIN:$PATH"
fi

echo "✅ Installation completed!"
echo "CLI commands 'opener' and 'o-' are now available globally."
echo "User data will be stored in $DATA_DIR."
echo "Open a new terminal or run 'source $SHELL_PROFILE' to update PATH if needed."
