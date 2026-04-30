#!/usr/bin/env sh

set -e

BASEDIR=$(dirname "$0")

if [ -z "$GRADLE_USER_HOME" ]; then
    export GRADLE_USER_HOME=$HOME/.gradle
fi

"$BASEDIR/gradle/wrapper/gradle-wrapper.jar" "$@"