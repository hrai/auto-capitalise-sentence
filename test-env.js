import $ from 'jquery';
global.$ = global.jQuery = $;

import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window
