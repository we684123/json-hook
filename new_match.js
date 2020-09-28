var source = {
  "update_id": 498276656,
  "message": {
    "message_id": 367,
    "from": {
      "id": 207014603,
      "is_bot": false,
      "first_name": "永格天",
      "last_name": "(則天)",
      "username": "we684123",
      "language_code": "zh-hant"
    },
    "chat": {
      "id": -1001097080770,
      "title": "逆流(超級)",
      "type": "supergroup"
    },
    "date": 1601312056,
    "forward_from": {
      "id": 207014603,
      "is_bot": false,
      "first_name": "永格天",
      "last_name": "(則天)",
      "username": "we684123",
      "language_code": "zh-hant"
    },
    "forward_date": 1601311963,
    "photo": [{
      "file_id": "AgACAgUAAx0CQWQfwgACAW9fchU4wLSwfnDwEZR4I9zJxFUlPAACMqsxGzFokFfU-3M3tdGeQ_K6Zmt0AAMBAAMCAANtAAPtfwcAARsE",
      "file_unique_id": "AQAD8rpma3QAA-1_BwAB",
      "file_size": 18422,
      "width": 320,
      "height": 180
    }, {
      "file_id": "AgACAgUAAx0CQWQfwgACAW9fchU4wLSwfnDwEZR4I9zJxFUlPAACMqsxGzFokFfU-3M3tdGeQ_K6Zmt0AAMBAAMCAAN4AAPufwcAARsE",
      "file_unique_id": "AQAD8rpma3QAA-5_BwAB",
      "file_size": 70401,
      "width": 800,
      "height": 450
    }, {
      "file_id": "AgACAgUAAx0CQWQfwgACAW9fchU4wLSwfnDwEZR4I9zJxFUlPAACMqsxGzFokFfU-3M3tdGeQ_K6Zmt0AAMBAAMCAAN5AAPvfwcAARsE",
      "file_unique_id": "AQAD8rpma3QAA-9_BwAB",
      "file_size": 132519,
      "width": 1280,
      "height": 720
    }],
    "caption": "不處理"
  }
}


var amis7 = {
  "and": [
    {
      'targer': ["message", "forward_from"],
      'value': '',
      'only_exist': true,
      'use_re': false
    },
  ],
  "or": [{
    'targer': ["message", "chat", "id"],
    'value': 207014603,
    'only_exist': false,
    'use_re': false
  }, {
    'targer': ["message", "chat", "id"],
    'value': -1001097080770,
    'only_exist': false,
    'use_re': false
  },],
  "not": {
    "and": {
      'targer': ["message", "caption"],
      'value': '不處理',
      'only_exist': false,
      'use_re': false
    },
    "or": ''
  },
}

function check_parameter(par){
  //這裡確認 targer value... 都在
}

function match(amis: any, source: any): any {
  var and = amis['and']
  var or = amis['or']
  var not = amis['not']
  if (and === undefined && or === undefined) {
    throw "and 跟 or 最少要給一個";
  }

  var and_list = []
  var or_list = []
  var not_list = []
  if (and === undefined) {
    and_list = [true]
  }else{
    check_parameter(and)
    //這裡寫分析

  }
  if (or === undefined) {
    and_list = [true]
  }

}


match(amis7, source)
