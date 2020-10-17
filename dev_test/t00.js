const json_hook = require('json-hook-trigger');
var hook = new json_hook.json_hook()

const path = require('path');
const fs = require('fs');

const plugins_folder = './plugins'
const directoryPath = path.join(__dirname, plugins_folder);

const file_name_re = RegExp('.+\.(ts|js)$', 'g')
const get_plugin_function_name_re = RegExp('^function\ ([^{}]+)', 'g')

fs.readdir(directoryPath, function(err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  files.forEach(function(file) {
    if (!!String(file).match(file_name_re)) {
      console.log(file);

      fs.readFile(`./${plugins_folder}/${file}`, function(err, data) {
        if (err) throw err;

        let data_str = data.toString()
        // console.log(data_str);
        let i = data_str.match(get_plugin_function_name_re)
        let j = i[0].replace('function ','')
        console.log(j);
        eval(data_str) // 載入 plugin function 內容
        eval(j) // 執行 plugin function
      })
    }
  })
})

var is_forward = require('./plugins/is_forward')
var isf = new is_forward(hook)
hook.hooks
isf.plugin_is_forward(hook)
typeof(is_forward.)


var data_str=`function plugin_ping(hook){
  var aims = {
    "and": [{
      'targer': ["message", 'text'],
      'value': 'ping',
      'only_exist': false,
      'use_re': true
    }]
  }

  function ping(incoming) {
    console.log("get ping time = " + incoming.message.date);
  }
  hook.addHook(aims, ping)
  console.log('plugin_ping ed');
}`
let i = data_str.match(get_plugin_function_name_re)
let j = i[0].replace('function ','')
console.log(j);

eval(data_str)
eval(j)
