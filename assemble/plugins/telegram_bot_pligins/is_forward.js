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
  hook.addHook(aims, is_forward)
  console.log('plugin_is_forward ed');
}
