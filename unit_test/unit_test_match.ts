// this test is use Deno !

// @ts-ignore
import { match } from './match.ts'

let i = 0
var source = {
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



var amis = {"and":[
  {
    'targer': ["update_id"],
    'value': '123',
    'only_exist': true,
    'use_re': true
  }
]}
i++
console.log(`\n${i}`);
console.log(match(amis, source) == true)
// -----------------------------------------
amis = {"and":[
  {
    'targer': ["update_id"],
    'value': '123',
    'only_exist': true,
    'use_re': false
  }
]}
i++
console.log(`\n${i}`);
console.log(match(amis, source) == true)
// -----------------------------------------
amis = {"and":[
  {
    'targer': ["update_id"],
    'value': '123',
    'only_exist': false,
    'use_re': false
  }
]}
i++
console.log(`\n${i}`);
console.log(match(amis, source) == false)
// -----------------------------------------
amis = {"and":[
  {
    'targer': ["update_id"],
    'value': '123',
    'only_exist': false,
    'use_re': true
  }
]}
i++
console.log(`\n${i}`);
console.log(match(amis, source) == false)
// -----------------------------------------
var amis2 = {"and":[
  {
    'targer': ["update_id"],
    'value': 123,
    'only_exist': false,
    'use_re': true
  }
]}
i++
console.log(`\n${i}`);
console.log(match(amis2, source) == false)
// -----------------------------------------
amis2 = {"and":[
  {
    'targer': ["update_id"],
    'value': 123,
    'only_exist': false,
    'use_re': false
  }
]}
i++
console.log(`\n${i}`);
console.log(match(amis2, source) == false)
// -----------------------------------------
amis2 = {"and":[
  {
    'targer': ["update_id"],
    'value': 910469164,
    'only_exist': false,
    'use_re': false
  }
]}
i++
console.log(`\n${i}`);
console.log(match(amis2, source) == true)
// -----------------------------------------
amis2 = {"and":[
  {
    'targer': ["update_id"],
    'value': 910469164,
    'only_exist': false,
    'use_re': true
  }
]}
i++
console.log(`\n${i}`);
console.log(match(amis2, source) == true)
// -----------------------------------------
amis2 = {"and":[
  {
    'targer': ["update_id"],
    'value': 910469164753,
    'only_exist': false,
    'use_re': true
  }
]}
i++
console.log(`\n${i}`);
console.log(match(amis2, source) == false)
// -----------------------------------------
amis = {"and":[
  {
    'targer': ["update_id"],
    'value': '910469164',
    'only_exist': false,
    'use_re': true
  }
]}
i++
console.log(`\n${i}`);
console.log(match(amis, source) == true)
// -----------------------------------------
amis = {"and":[
  {
    'targer': ["update_id"],
    'value': '^910469164$',
    'only_exist': false,
    'use_re': true
  }
]}
i++
console.log(`\n${i}`);
console.log(match(amis, source) == true)
// -----------------------------------------
amis = {"and":[
  {
    'targer': ["update_id"],
    'value': '104691',
    'only_exist': false,
    'use_re': true
  }
]}
i++
console.log(`\n${i}`);
console.log(match(amis, source) == true)
// -----------------------------------------
let amis3 = {"and":[
  {
    'targer': ["update_id"],
    'value': '104691',
    'only_exist': false,
    'use_re': true
  },{
    'targer': ["message",'from','is_bot'],
    'value': false,
    'only_exist': false,
    'use_re': false
  },
]}
i++
console.log(`\n${i}`);
console.log(match(amis3, source) == true)
// -----------------------------------------
let amis4 = {"and":[
  {
    'targer': ["update_id"],
    'value': '104691',
    'only_exist': false,
    'use_re': true
  },{
    'targer': ["message",'from','is_bot'],
    'value': false,
    'only_exist': false,
    'use_re': false
  },{
    'targer': ["message",'from','id'],
    'value': 207014603,
    'only_exist': false,
    'use_re': false
  },
]}
i++
console.log(`\n${i}`);
console.log(match(amis4, source) == true)
// -----------------------------------------


// ==================================================
var source2 = {
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
    "caption": "不處理k"
  }
}
// -----------------------------------------
let amis5 = {
  "and": [{
    'targer': ["message", "forward_from"],
    'value': '',
    'only_exist': true,
    'use_re': false
  },],
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
  },],
  "not": {
    "and": [{
      'targer': ["message", "caption"],
      'value': '不處理',
      'only_exist': false,
      'use_re': false
    }],
    "or": []
  }
}
i++
console.log(`\n${i}`);
console.log(match(amis5, source2) == true)
// -----------------------------------------
amis5 = {
  "and": [{
    'targer': ["message", "forward_from"],
    'value': '',
    'only_exist': true,
    'use_re': false
  },],
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
  },],
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
i++
console.log(`\n${i}`);
console.log(match(amis5, source2) == false)
// -----------------------------------------
