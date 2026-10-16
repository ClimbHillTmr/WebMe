#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

command -v gh >/dev/null || { echo 'Install GitHub CLI first: https://cli.github.com'; exit 1; }
account="$(gh api user --jq .login)"
if [ "$account" != 'ClimbHillTmr' ]; then
  echo 'Please sign in to GitHub CLI as ClimbHillTmr before publishing.'
  exit 1
fi

node --check docs/app.js
node --check docs/citations.js
if [ ! -d .git ]; then git init -b main; fi
git add -- docs README.md .gitignore deploy.sh
if ! git diff --cached --quiet; then
  git commit -m 'Build public academic homepage with publications and research projects'
fi

if ! gh repo view ClimbHillTmr/WebMe >/dev/null 2>&1; then
  gh repo create ClimbHillTmr/WebMe --public --description 'Qi Guo — Research, publications and projects'
fi
if git remote get-url origin >/dev/null 2>&1; then
  remote="$(git remote get-url origin)"
  case "$remote" in
    https://github.com/ClimbHillTmr/WebMe|https://github.com/ClimbHillTmr/WebMe.git|git@github.com:ClimbHillTmr/WebMe.git) ;;
    *) echo 'Unexpected origin. Check the remote before publishing.'; exit 1 ;;
  esac
else
  git remote add origin https://github.com/ClimbHillTmr/WebMe.git
fi
git push -u origin HEAD:main

pages_config='{"build_type":"legacy","source":{"branch":"main","path":"/docs"}}'
if gh api repos/ClimbHillTmr/WebMe/pages >/dev/null 2>&1; then
  printf '%s' "$pages_config" | gh api --method PUT repos/ClimbHillTmr/WebMe/pages --input -
else
  printf '%s' "$pages_config" | gh api --method POST repos/ClimbHillTmr/WebMe/pages --input -
fi
gh repo edit ClimbHillTmr/WebMe --homepage https://climbhilltmr.github.io/WebMe/
echo 'Source uploaded. GitHub Pages deployment requested.'
echo 'Check build status: https://github.com/ClimbHillTmr/WebMe/actions'
echo 'Website after a successful build: https://climbhilltmr.github.io/WebMe/'
