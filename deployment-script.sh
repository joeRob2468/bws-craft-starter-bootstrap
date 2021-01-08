#!/bin/bash

# This shell script is tool to automate git deployment
# through webhooks. Be sure to run from within the root directory.

# Backup assets and db if env environment is set
if [ -f "./.env.sh" ]; then
    printf -- ' Creating backups...';
    ./shell-scripts/backup_db.sh
    ./shell-scripts/backup_assets.sh
    printf -- ' DONE!\n';
fi

# merge git changes
git merge

# Run composer install
printf -- ' Updating composer...';
cd cms
if composer install --no-interaction --prefer-dist --optimize-autoloader; then
    printf -- ' DONE!\n';
    
    # run Craft CMS migration and project sync command
    printf -- ' Running Craft CMS migration...';
    php ./craft migrate/all --no-content --interactive=0
    php ./craft project-config/apply --force
    php ./craft migrate --track=content --interactive=0
    printf -- ' DONE!\n';

    # clear caches
    printf -- ' Clearing caches...';
    php ./craft clear-caches/compiled-templates
    printf -- ' DONE!\n';
fi

# cd back to main directory, add additional scripts below
cd ../