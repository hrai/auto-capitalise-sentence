/*global importScripts*/
/*eslint no-undef: "error"*/

try {
  importScripts(
    'lib/background.bundle.js' /*, and so on */
    /* 'dependencies/jquery.min.js', */
  );
} catch (e) {
  console.error(e);
}
