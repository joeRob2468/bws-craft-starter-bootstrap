## Boyer Web Studios
This project contains the full starter theme for [Boyer Web Studios](https://www.boyerwebstudios.com), built on Craft 3 and Webpack 4. 

## About 
In addition to setting up a new Craft 3 CMS project, this project sets up:

Best-practices configuration for Craft CMS, including a template and plugin setup for building flexible themes using content blocks  
Full webpack build system for SCSS and ES6 project dependencies  
Easily adjustable environments using .env files  
Utility bash scripts for easy setup and management of backups and database syncing  
Docker local development toolset using [Laradock](https://laradock.io/).  


## Installation

### Production Deployment

1. Clone this repository.
2. Run `cd cms && composer install` to install dependencies and create default environment settings in `.env.sh` and `cms/.env`.
3. Update `.env.sh` and `cms/.env` with the proper production environment settings.
4. Run `./cms/craft install` and follow directions. 
6. Run `./shell-scripts/backup_assets.sh` to create backups directory
7. If you have a set of local backups, upload the `assets`, `craft`, and `db` folders into `backups/DATABASE_NAME`. 
8. Run `./shell-scripts/restore_assets.sh` to restore asset backups
9. Run `./shell-scripts/restore_db.sh ./backups/DATABASE_NAME/db/BACKUP_FILENAME` to restore database backups. 

### Local Development

In local development, you'll be setting up the Laradock docker containers, then running all of your dependency, backup/restore, and build commands inside the `workspace` container to help keep your project code isolated. It's fine to run `laradock.sh` and `git` commands outside the container, but everything else should be done in the `workspace` container.

1. Install and run Docker Desktop. If you're on Windows, also install Git for Windows, and Ruby. 
2. Open a new terminal session (in Git Bash if you're on Windows). 
3. If you haven't done this already for your git environment, set up git with your name and email address by running:
    > `git config --global user.name "John Doe"`  
    > `git config --global user.email johndoe@example.com`  
    > `git config --global submodule.recurse true`  
4. Clone this repository onto your local machine. 
5. `cd` to your new project directory.
6. Make sure `laradock.sh` is executable by running `chmod +x laradock.sh`
7. Run `./laradock.sh install` to install the docker-sync gem and set up your default laradock environment. 
8. Build and start your Laradock service containers by running `./laradock.sh up`. This will take a while. 
9. Once the containers have built and started, run `./laradock.sh bash` to open a terminal session inside the workspace. 
9. Run `cd cms && composer install`. This will install the Craft CMS dependencies and create default environment variable files.
10. `cd` back to the root project folder and run `./cms/craft install`. Leave all settings at default (by pressing enter without typing anything), except for the following settings:
    > Username: `admin`  
    > Email: `hello@boyerwebstudios.com`  
    > Password: `secret`
11. Run `yarn install` to install the webpack build dependencies (for making changes to the site assets)
12. You're done! Open `http://localhost/` to see the website, and navigate to `http://localhost/admin` to log into the admin panel using the credentials you set up in step 11. 

## Environment Defaults (use for Craft CMS installation on development environment)

**Craft CMS User**  
Username: `admin`  
Email: `hello@boyerwebstudios.com`  
Password: `secret`

**MySQL**  
Driver: `mysql`  
Host: `mysql`  
User: `default`  
Password: `secret`  
Database: `default`  
Port: `3306`

**Apache2**  
Site address: `http://localhost/`  
Document root: `/var/www/cms/web`


## Working on the development site and building site assets

Make sure the Docker containers are up by running on your host machine by running `./laradock.sh up` in your root project directory.

Open a bash session inside the Docker `workspace` container by running `laradock.sh bash` You'll be running all backup/restore and build commands (except for `git` commands) inside this container. 

Make sure you've installed the webpack dependencies, which are installed by running `yarn install` during the initial setup. 

To build the site assets and watch for changes, run `yarn watch`. To stop watching for changes, press `ctrl/cmd + c`. To create a production build, run `yarn build`.

Open `http://localhost/` to view the site. 

When you're done working, stop the webpack build if it's running. If you adjusted the Craft CMS database or uploaded/changed any assets in the CMS, make updated backups of your database and assets by running `./shell-scripts/backup_assets.sh` and `./shell-scripts/backup_db.sh`, then exit the `workspace` bash session by running `exit`.

To shut down the Docker containers, run `./laradock.sh down`

We highly suggest that you pull the latest version of the GitHub project repository before you start working, create regular `git` commits as you finish chunks of work, and push all your changes to the GitHub repository when you're done for the day, so all developers always have access to the latest codebase. Run your `git` commands as you normally would, not inside the `workspace` container. 


## File and database backups

We've included a command-line script system to allow for easy creation and restoration of file and database backups. The shell scripts are configured by the `.env.sh` environment file. If you're working in a local development environment, all backup and restore commands should be run from a bash session inside the `workspace` container. If you can't run a script, make sure it's executable by running `chmod +x PATH_TO_SCRIPT`. 

Backups are stored in the `backups` directory, under a directory named after the primary database. For example, the default database is named `default`, so backups will be stored in `backups/default`. Assets are stored in `backups/default/assets`, and database dumps are stored in `backups/default/db`.

### Asset Backups

To create asset backups, run `./shell-scripts/backup_assets.sh`, which will back up all the assets uploaded to Craft CMS. 

To restore asset backups, run `./shell-scripts/restore_assets.sh`. 

### Database Backups

To create a database backup, run `./shell-scripts/backup_db.sh`, which will create a full backup of the primary database. 

To restore a database backup, run `./shell-scripts/restore_db.sh ./backups/default/db/FILENAME`.


## About Craft CMS

Craft is a content-first CMS that aims to make life enjoyable for developers and content managers alike. It is optimized for bespoke web and application development, offering developers a clean slate to build out exactly what they want, rather than wrestling with a theme.

Learn more about Craft at [craftcms.com](https://craftcms.com).