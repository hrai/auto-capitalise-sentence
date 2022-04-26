/*global importScripts*/
/*eslint no-undef: "error"*/

try {
  importScripts(
    'dependencies/jquery.min.js',
    'lib/background.bundle.js' /*, and so on */
  );
} catch (e) {
  console.error(e);
}
