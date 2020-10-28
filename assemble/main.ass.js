const json_hook = require('./hook');
var hook = new json_hook.json_hook()

var source = {
    "update_id": 910469164,
    "message": {
      "date": 1594795274,
      "text": "ping"
    }
  }
// load_functions
// load_plugins
function plugin_pingOOOOOO(hook) {
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
  hookhook.macthRun(aims,ping,source,incoming,hook.strict_equality)
  console.log('plugin_ping ed');
}

plugin_pingOOOOOO(hook) 
function plugin_LINE_ping(hook) {
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
  hookhook.macthRun(aims,ping,source,incoming,hook.strict_equality)
  console.log('plugin_ping ed');
}

plugin_LINE_ping(hook) 
function plugin_TG_is_forward(hook) {
  var aims = {
    // source['message']['forward_from'] 必須存在
    "and": [{
      'targer': ["message", "forward_from"],
      'value': '',
      'only_exist': true,
      'use_re': false
    }],
    // 當 source['message']['chat']['id'] 為 207014603 或 -1001097080770 都可以接受
    "or": [{
      'targer': ["message", "chat", "id"],
      'value': '207014603',
      'only_exist': false,
      'use_re': false
    }, {
      'targer': ["message", "chat", "id"],
      'value': '-1001097080770',
      'only_exist': false,
      'use_re': false
    }],
    // 不接受當 source['message']['caption'] 等於 '不處理k' 的時候
//    "not": {
//      "and": [{
//        'targer': ["message", "caption"],
//        'value': '不處理k',
//        'only_exist': false,
//        'use_re': false
//      }],
//      "or": []
//    }
  }
  function is_forward(incoming){
    console.log("this is forward message");
  }
  hookhook.macthRun(aims,is_forward,source,incoming,hook.strict_equality)
  console.log('plugin_is_forward ed');
}

plugin_TG_is_forward(hook) 
function plugin_TG_ping(hook){
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
  hookincoming.macthRun(aims,ping,source,incoming,incoming.strict_equality)
  console.log('plugin_ping ed');
}

plugin_TG_ping(hook)


var incoming = source
hook.macth_run(source, incoming, false)





//
