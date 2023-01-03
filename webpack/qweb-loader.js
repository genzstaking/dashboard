"use strict";

exports.default = loader;

var _loaderUtils = require("loader-utils");
var _schemaUtils = require("schema-utils");

function loader(source) {
  var res= `window.assets.loadXML('${source}');`;
  console.log(res);
  return res;
}