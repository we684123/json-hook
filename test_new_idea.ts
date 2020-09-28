import { match } from '../match'


var i = 0
let source = {
  "update_id": 910469164,
  "message": {
    "message_id": 64609,
    "from": {
      "id": 207014603,
      "is_bot": false,
      "first_name": "永格天",
      "last_name": "(則天)",
      "username": "we684123",
      "language_code": "zh-hant"
    },
    "chat": {
      "id": 207014603,
      "first_name": "永格天",
      "last_name": "(則天)",
      "username": "we684123",
      "type": "private"
    },
    "date": 1594795274,
    "text": "🔭 訊息狀態"
  }
}

// -----------------------------------------

let amis5 = {
  "and": [
    {
      'targer': ["message","chat","id"],
      'value': '207014603',
      'only_exist': false,
      'use_re': false
    },
    {
      'targer': ["message","chat","text"],
      'value': '🔭 訊息狀態',
      'only_exist': false,
      'use_re': false
    },
  ],
  "or": [],
  "not": [],
}
i++
console.log(`\n${i}`);
console.log(match(amis5, source) == true)
// -----------------------------------------
let amis6 = {
  "and": [
    {
      'targer': ["message","chat","text"],
      'value': '🔭 訊息狀態',
      'only_exist': false,
      'use_re': false
    },
  ],
  "or": [{
    'targer': ["message","chat","id"],
    'value': '207014603',
    'only_exist': false,
    'use_re': false
  },{
    'targer': ["message","chat","id"],
    'value': '207014604',
    'only_exist': false,
    'use_re': false
  },],
  "not": [],
}
i++
console.log(`\n${i}`);
console.log(match(amis6, source) == true)
// -----------------------------------------
let amis7 = {
  "and": [
    {
      'targer': ["message","forward_from"],
      'value': '',
      'only_exist': true,
      'use_re': false
    },
  ],
  "or": [{
    'targer': ["message","chat","id"],
    'value': 207014603,
    'only_exist': false,
    'use_re': false
  },{
    'targer': ["message","chat","id"],
    'value': -1001097080770,
    'only_exist': false,
    'use_re': false
  },],
  "not": {
    "and":{
      'targer': ["message","caption"],
      'value': '不處理',
      'only_exist': false,
      'use_re': false
    },
    "or":''
  },
}
i++
console.log(`\n${i}`);
console.log(match(amis7, source) == true)
// -----------------------------------------







//
