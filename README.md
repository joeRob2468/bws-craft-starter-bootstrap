## Boyer Web Studios
This project contains the full starter theme for [Boyer Web Studios](https://www.boyerwebstudios.com), built on Craft 3 and Webpack 4. 

## About 
In addition to setting up a new Craft 3 CMS project, this project sets up:
 
* [Craft 3 Multi-Environment](https://github.com/nystudio107/craft3-multi-environment) as described in the [Multi-Environment Config for Craft CMS](https://nystudio107.com/blog/multi-environment-config-for-craft-cms) article
* [Craft-Scripts](https://github.com/nystudio107/craft-scripts) as described in the [Database & Asset Syncing Between Environments in Craft CMS](https://nystudio107.com/blog/database-asset-syncing-between-environments-in-craft-cms), [Mitigating Disaster via Website Backups](https://nystudio107.com/blog/mitigating-disaster-via-website-backups) & [Hardening Craft CMS Permissions](https://nystudio107.com/blog/hardening-craft-cms-permissions) articles

It also installs a few base plugins described in the [Setting up a New Craft 3 CMS Project](https://nystudio107.com/blog/enhancing-a-craft-cms-3-website-with-a-custom-module) article.

## Installation

First, clone the repository onto your local machine and install the project dependencies by running `composer install`. If installing on a production environment, run `yarn install --production`. Otherwise, run `yarn`. 

Then `cd` to your new project directory, and run Craft's `setup` console command to create your `.env` environments. _When asked if you want to install, say no._

    cd PATH
    ./craft setup

Then, run the `nys-setup` command to configure Craft-Scripts & Craft 3 Multi-Environment based on your newly created `.env` settings:

    ./nys-setup

Next, run `./craft install` to run the craft installation scripts. 

Finally, open `.env.sh`, and change the `LOCAL_BACKUPS_PATH` variable from "REPLACE_ME" to this:
    
    LOCAL_BACKUPS_PATH=${LOCAL_ROOT_PATH}"backups/"

That's it, enjoy!

If you ever delete the `vendor` folder or such, just re-run:

    ./nys-setup

...and it will re-create the symlink to your `.env.sh`; don't worry, it won't stomp on any changes you've made.

## Build Process

To build for production, make sure `yarn` and `composer` dependencies are installed, then run `yarn build`. To build for a local environment and watch for changes, run `yarn watch`. 

## About Craft CMS

Craft is a content-first CMS that aims to make life enjoyable for developers and content managers alike. It is optimized for bespoke web and application development, offering developers a clean slate to build out exactly what they want, rather than wrestling with a theme.

Learn more about Craft at [craftcms.com](https://craftcms.com).

## How to Install Craft 3 Beta

Installation instructions can be found in the [Craft 3 documentation](https://github.com/craftcms/docs/blob/master/en/installation.md).

## Resources

#### Official Resources
- [Craft 3 Documentation](https://github.com/craftcms/docs)
- [Craft 3 Plugins](https://github.com/craftcms/plugins)
- [Demo site](https://demo.craftcms.com/)
- [Craft Slack](https://craftcms.com/community#slack)
- [Craft CMS Stack Exchange](http://craftcms.stackexchange.com/)

#### Community Resources
- [Mijingo](https://mijingo.com/craft) – Video courses and other learning resources
- [Envato Tuts+](https://webdesign.tutsplus.com/categories/craft-cms/courses) – Video courses
- [Straight Up Craft](http://straightupcraft.com/) – Articles, tutorials, and more
- [Craft Cookbook](https://craftcookbook.net/) – Quick answers for common tasks
- [pluginfactory.io](https://pluginfactory.io/) – Craft plugin scaffold generator
