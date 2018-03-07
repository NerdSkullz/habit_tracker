# Hardhat Middleman site
Welcome to a Hardhat Middleman site. Enjoy your stay.

## Installation
* Run `bundle && yarn` to install packages
* Run server locally with `middleman`, live at [localhost:4567](http/localhost:4567)
* Build project with `middleman build`, assets get put in `build/`
* From `master` branch, deploy changes with `middleman rsync production`

## Features
* Configured with Webpack for compiling TypeScript and other assets
* Live-reload desabled by default, uncomment `activate :livereload` in `config.rb` to enable

## Assets
* Put fonts and images in `assets/fonts/` and `assets/images/` respectively
* Reference fonts and images within SCSS with the usual `url('...')` directive
* When referencing an image from HTML, use the `webpack_image_path` helper like so:
```
<%= image_tag webpack_image_path('image.png'), alt: 'Image' %>
```
