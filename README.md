# October CMS theme Skeleton
This is a generic starting point for an OctoberCMS theme.

It provides some basic config to leverage webpack.

### Usage
1. Download zip, or clone and then throw away the .git directory
2. Place in desired directory within your site's theme directory
3. Install node modules: `npm install` or `yarn` 
4. Edit theme.yaml
5. Edit styles and JS within the `src` directory
6. Compile styles and JS with webpack using the provided npm/yarn scripts:

`npm run dev` / `yarn dev`

This script will build dev versions of the CSS & JS -- IE: Concatenated, but not minified.

---
`npm run prod` / `yarn prod`

This script will build minified production versions of the CSS & JS

---
`npm run watch` / `yarn watch`

This script will build dev versions of CSS & JS, and watch for relevant file changes.


### TODO
A lot. This is just the very first pass. It's usable, but totally bare.
Have an idea for a feature? Submit a pull request.