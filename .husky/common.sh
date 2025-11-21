#!/bin/sh

# Simple helper to check if a command exists
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Ensure Node/Yarn/NPM binaries from local project are available
export PATH="$PATH:./node_modules/.bin"