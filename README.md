# Accessible & Responsive drop down navigation
CommonJS navigation module using ARIA accessibility attributes. User can tab through drop down items. Compatible Chrome, Firefox, Safari and IE 8+.

## List of Tools
* [SASS](http://sass-lang.com/)
* [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
* [Browserify](http://browserify.org/)
* [JS Hint](http://jshint.com/docs/options/)

## Set up
```npm install```

## Build

To begin working on the project, run:

```npm run dev```

A new tab will open on your browser. Styles and scripts will be processed and watched for changes. Scripts will be linted. The `/src` folder contains all JavaScript and Sass. The accessible navigation module is in `/src/scripts/modules/accessible-nav.js`.

**Resize the screen to view the mobile version and how the sub navigations are working.**

## Context
Originally part of a project using Umbraco and involving a Back end developer. This navigation was integrated in an Umbraco View.
The classes for the ```active``` state were added by back end, checking if one of the item in the navigation were the current page or one of its ancestors and adding the classes accordingly.
If a child item is the current page, it and its parent get the ```active``` class.
