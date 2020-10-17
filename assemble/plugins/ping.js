function plugin_ping(hook){
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
}
