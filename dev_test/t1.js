var fs = require("fs");
var path = require("path");

const plugin_path = path.join(process.cwd(), "/assemble/main.js");
var data_str = fs.readFileSync(plugin_path).toString();

const re_loadNodejsPlugin = RegExp("(^[^.\n]+.loadNodejsPlugin[^\n]+)", "gm");
const re_loadGoogleAppsScriptPlugin = RegExp(
  "(^[^.\n]+.loadGoogleAppsScriptPlugin[^\n]+)",
  "gm"
);
// data_str.replace("");
// console.log(data_str);
// replaceAll(re_loadNodejsPlugin,)

data_str = data_str.replace(re_loadNodejsPlugin,'// $1')
data_str = data_str.replace(re_loadGoogleAppsScriptPlugin,'// $1')
//
// // let i = ;
// if (i=data_str.match(re_loadNodejsPlugin))
// 	data_str = i.map(x => '// ' + x)
// // let j =
// if (j=data_str.match(re_loadGoogleAppsScriptPlugin))
// 	data_str = j.map(x => '// ' + x)

console.log(data_str);
