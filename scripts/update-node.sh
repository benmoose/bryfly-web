#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

nvm_dir=${NVM_DIR:?"nvm is not installed"}
[[ -f "$nvm_dir/nvm.sh" ]] && source "$nvm_dir/nvm.sh"
#bold='\033[0;1m'
#dim='\033[0;2m'
#normal='\033[0;0m'
green='\033[0;32m'
clear='\033[0m'

app_dir=${0%%/*}
current_node=$(cat "$app_dir/.nvmrc")
engine=$(pnpm pkg get engines.node | tr -cd '[:digit:]')
latest_node=$(nvm version-remote --lts "$engine")
if [[ "$current_node" == "$latest_node" ]]; then
  exit
fi

if [[ $# -eq 0 ]]; then
  echo "Please update project to use node $latest_node" >&2
  exit 1
elif [[ "${1-}" == "-w" || "${1-}" == "--write" ]]; then
  echo "$latest_node" > "$app_dir/.nvmrc" && \
	echo -e "${green}Project updated!${clear}" && \
    echo ""
  nvm install --latest-npm --reinstall-packages-from=current "$latest_node"
  exit $?
else
  echo "usage: $0 [--write, -w]"
fi

