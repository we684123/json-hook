interface aims_par_interface {
  'targer':string[],
  'value':any,
  'only_exist':boolean,
  'use_re':boolean,
}

interface aims_object_interface {
  'and'?:aims_par_interface[],
  'or'?:aims_par_interface[],
  'not'?:aims_par_interface[],
}
var aims = {
  "and": [{
    'targer': ["message", 'text'],
    'value': 'ping',
    'only_exist': false,
    'use_re': true
  }]
}

var amis2 = {
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
  "not": {
    "and": [{
      'targer': ["message", "caption"],
      'value': '不處理k',
      'only_exist': false,
      'use_re': false
    }],
    "or": []
  }
}
