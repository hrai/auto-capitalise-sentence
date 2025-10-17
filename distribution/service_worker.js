/*global importScripts*/
/*eslint no-undef: "error"*/

try {
  importScripts('lib/background.bundle.js' /*, and so on */);
} catch (e) {
  console.error(e);
}
