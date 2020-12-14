#!/bin/bash
set -ef -o pipefail

if [ -n "$VERSION" ]; then
  export GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -o User=${SSH_USER} -i ${SSH_KEY}"
  # add git tag
  if [ ! -n "${CURR_GIT_TAG}" ]; then
    git tag v${VERSION}
    git push origin v${VERSION}
    echo "tag added 'v${VERSION}'"
  else
    echo "Git tag ${CURR_GIT_TAG} exists, skip!"
  fi
else
  echo "ERROR: Version is not defined!" 1>&2
  exit 1
fi
