#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

nvm_dir=${NVM_DIR:?"nvm is not installed."}
[[ -f "$nvm_dir/nvm.sh" ]] && source "$nvm_dir/nvm.sh"

semver="20"
app_dir=${0%%/*}
project_v=$(cat "$app_dir/.nvmrc")
latest_v=$(nvm version-remote --lts "$semver")

[[ "$project_v" == "$latest_v" ]] && exit

if [[ $# -eq 0 ]]; then
  echo "Project uses Node $project_v. Please update to Node $latest_v." >&2
  exit 1
elif [[ "${1-}" == "-w" || "${1-}" == "--write" ]]; then
  nvm install --lts --reinstall-packages-from=current "$latest_v" && \
    nvm use --silent "$latest_v" && \
    nvm current > "$app_dir/.nvmrc" && \
    echo "Project engine updated to Node $latest_v!"
  exit $?
else
  echo "usage: $0 [--write, -w]"
fi
