#!/bin/bash

# Usage: 
# ./backup_and_sync_to_drive.sh -e "ABSOLUTE_PATH_TO_RCLONE_BIN" -p "ABSOLUTE_PATH_TO_APP_DIRECTORY" -t sync -r drive -s "ABSOLUTE_PATH_TO_BACKUP_DIRECTORY" -d "SITE_NAME_ON_GD"
# e: executable - path to rclone binary
# p: root directory to run commands in - absolute path of webapp root directory
# t: type - sync or clone
# r: remote - name of rclone remote that has been configured
# s: source path - absolute path of directory to backup
# d: remote path - path of remote directory on remote to use, relative to configured root directory

while getopts e:p:t:r:s:d: option
do
case "${option}"
in
e) RCLONE=${OPTARG};;
p) ROOT=${OPTARG};;
t) TYPE=${OPTARG};;
r) REMOTE=${OPTARG};;
s) SOURCE_PATH=${OPTARG};;
d) REMOTE_PATH=${OPTARG};;
esac
done

cd $ROOT && $ROOT/shell-scripts/backup_db.sh && $ROOT/shell-scripts/backup_assets.sh && $ROOT/shell-scripts/backup-sync/sync_to_drive.sh -e $RCLONE -t $TYPE -r $REMOTE -s $SOURCE_PATH -d $REMOTE_PATH