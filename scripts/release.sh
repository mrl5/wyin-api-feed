#!/bin/bash

START_DIR="$PWD"
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
TARGET_DIR="$(dirname $SCRIPT_DIR)"

set -e -u -o pipefail
trap 'cleanup $? $LINENO' EXIT

main() {
    cd "$TARGET_DIR"
    bump_version
}

cleanup() {
    if [ "$1" != "0" ]; then
        echo "Error $1 occurred on $2"
    fi
    cd "$START_DIR"
}

get_recommended_bump() {
    yarn run -s recommended-bump
}

bump_version() {
    yarn version --$(get_recommended_bump)
}

main "$@"
