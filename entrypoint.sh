#!/bin/bash
set -eu

function apply_variables() {
    local variable=$1
    local val=$2
    local filepath=$3

    sed -ri "s/[{]{2} ?${variable} ?[}]{2}/${val}/g" ${filepath}
}

function setup() {
    cp ${APP_HOME}/ormconfig.org.js ${APP_HOME}/ormconfig.js
    local filepath=${APP_HOME}/ormconfig.js
    apply_variables "DB_USER" ${DB_USER} ${filepath}
    apply_variables "DB_PASS" ${DB_PASS} ${filepath}
    apply_variables "DB_NAME" ${DB_NAME} ${filepath}
}

function wait_db() {
    until mysqladmin ping -h db -P 3306 --silent;
    do
      echo "Waiting for database connection..."
      sleep 5
    done
    echo "!! database is ready."
}

rm ${APP_HOME}/ormconfig.json
setup
wait_db

if [ -n "${TESTING:-}" ]; then
    exec bash
else
    if [ ! -e /migration_done ]; then
        sudo -HEu node yarn migration:run

        if [ $? -eq 0 ]; then
            touch /migration_done
            echo "!! migration done !!"
        else
            echo "### [ERROR]: fail migration ###"
        fi
    fi

	exec sudo -HEu node "$@"
fi

