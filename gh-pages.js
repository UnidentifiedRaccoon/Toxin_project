// Create prod version with npm run prod
// Than just run this code to update gh-pages site
var ghpages = require('gh-pages');

ghpages.publish('dist');