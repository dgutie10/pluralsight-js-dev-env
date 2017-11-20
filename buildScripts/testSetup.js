//This file isn't transpiled, so musy use commonJS and ES5

//Register Babel to transpile before our test run
require('babel-register')();


// Disable webpack features that mocha doesn't understand
require.extensions['.css'] = function () {};