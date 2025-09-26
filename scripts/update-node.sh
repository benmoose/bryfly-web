#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

nvm_dir=${NVM_DIR:?"nvm is not installed"}
[[ -f "$nvm_dir/nvm.sh" ]] && source "$nvm_dir/nvm.sh"

dim='\033[0;2m'
green='\033[0;32m'
boldgreen='\033[1;32m'
clear='\033[0m'

if [[ "${1-}" == "-h" || "${1-}" == "--help" ]]; then
  echo -e "usage: $0 [--help,-h] [--write, -w]\n\t--write, -w\tUpdate .nvmrc\n\t--help, -h\tPrint this help message."
fi

app_dir=${0%%/*}
current_node=$(cat "$app_dir/.nvmrc")
engine=$(pnpm pkg get engines.node | tr -cd '[:digit:]')
latest_node=$(nvm version-remote --lts "$engine")
if [[ "$current_node" == "$latest_node" ]]; then
  echo -e "${green}Project up to date.${clear}"
  exit
fi

if [[ $# -eq 0 ]]; then
  echo "Project using old node version. Update to use node $latest_node" >&2 && \
    exit 1
fi

if [[ "${1-}" == "-w" || "${1-}" == "--write" ]]; then
  echo -en "  ${dim}Installing latest node version...${clear}" && \
    (nvm install --latest-npm --no-progress --reinstall-packages-from=current "$latest_node" &>/dev/null) && \
    echo " done."

  echo -en "  ${dim}Updating .nvmrc...${clear}" && \
    echo "$latest_node" > "$app_dir/.nvmrc" && echo " done."

  echo -e "${green}Project updated to${clear}" "${boldgreen}node $latest_node${clear}" && \
    echo -e "  ${dim}Remember to run${clear} \`nvm use\`"
  exit
fi
