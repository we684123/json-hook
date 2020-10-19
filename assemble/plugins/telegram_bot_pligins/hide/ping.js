function plugin_pingININININ(hook){
  // 這個不會被引入
  // this will not load
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
