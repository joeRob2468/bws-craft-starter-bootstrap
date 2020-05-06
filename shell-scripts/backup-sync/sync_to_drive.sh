#!/bin/bash

# Usage: 
# ./sync_to_drive.sh -e "PATH_TO_RCLONE_BIN" -t sync -r drive -s "ABSOLUTE_PATH_TO_BACKUP_DIRECTORY" -d "SITE_NAME_ON_GD"
# e: executable - path to rclone binary
# t: type - sync or clone
# r: remote - name of rclone remote that has been configured
# s: source path - absolute path of directory to backup
# d: remote path - path of remote directory on remote to use, relative to configured root directory

while getopts t:r:s:d: option
do
case "${option}"
in
e) RCLONE=${OPTARG};;
t) TYPE=${OPTARG};;
r) REMOTE=${OPTARG};;
s) SOURCE_PATH=${OPTARG};;
d) REMOTE_PATH=${OPTARG};;
esac
done

$RCLONE $TYPE --update --verbose --transfers 30 --checkers 8 --contimeout 60s --timeout 300s --retries 3 --low-level-retries 10 --stats 1s $SOURCE_PATH "$REMOTE:$REMOTE_PATH"