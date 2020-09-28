// @ts-ignore
import { match } from '../bot/functions/match.ts'

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
// console.log(true == true);
// console.log(true == false);
// console.log(false == false);
let i = 0

let amis = [
  {
    'targer': ["update_id"],
    'value': '123',
    'only_exist': true,
    'use_re': true
  }
]
i++
console.log(`\n${i}`);
console.log(match(amis, source) == true)
// -----------------------------------------
amis = [
  {
    'targer': ["update_id"],
    'value': '123',
    'only_exist': true,
    'use_re': false
  }
]
i++
console.log(`\n${i}`);
console.log(match(amis, source) == true)
// -----------------------------------------
amis = [
  {
    'targer': ["update_id"],
    'value': '123',
    'only_exist': false,
    'use_re': false
  }
]
i++
console.log(`\n${i}`);
console.log(match(amis, source) == false)
// -----------------------------------------
amis = [
  {
    'targer': ["update_id"],
    'value': '123',
    'only_exist': false,
    'use_re': true
  }
]
i++
console.log(`\n${i}`);
console.log(match(amis, source) == false)
// -----------------------------------------
let amis2 = [
  {
    'targer': ["update_id"],
    'value': 123,
    'only_exist': false,
    'use_re': true
  }
]
i++
console.log(`\n${i}`);
console.log(match(amis2, source) == false)
// -----------------------------------------
amis2 = [
  {
    'targer': ["update_id"],
    'value': 123,
    'only_exist': false,
    'use_re': false
  }
]
i++
console.log(`\n${i}`);
console.log(match(amis2, source) == false)
// -----------------------------------------
amis2 = [
  {
    'targer': ["update_id"],
    'value': 910469164,
    'only_exist': false,
    'use_re': false
  }
]
i++
console.log(`\n${i}`);
console.log(match(amis2, source) == true)
// -----------------------------------------
amis2 = [
  {
    'targer': ["update_id"],
    'value': 910469164,
    'only_exist': false,
    'use_re': true
  }
]
i++
console.log(`\n${i}`);
console.log(match(amis2, source) == true)
// -----------------------------------------
amis2 = [
  {
    'targer': ["update_id"],
    'value': 910469164753,
    'only_exist': false,
    'use_re': true
  }
]
i++
console.log(`\n${i}`);
console.log(match(amis2, source) == false)
// -----------------------------------------
amis = [
  {
    'targer': ["update_id"],
    'value': '910469164',
    'only_exist': false,
    'use_re': true
  }
]
i++
console.log(`\n${i}`);
console.log(match(amis, source) == true)
// -----------------------------------------
amis = [
  {
    'targer': ["update_id"],
    'value': '^910469164$',
    'only_exist': false,
    'use_re': true
  }
]
i++
console.log(`\n${i}`);
console.log(match(amis, source) == true)
// -----------------------------------------
amis = [
  {
    'targer': ["update_id"],
    'value': '104691',
    'only_exist': false,
    'use_re': true
  }
]
i++
console.log(`\n${i}`);
console.log(match(amis, source) == true)
// -----------------------------------------
let amis3 = [
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
]
i++
console.log(`\n${i}`);
console.log(match(amis3, source) == true)
// -----------------------------------------
let amis4 = [
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
]
i++
console.log(`\n${i}`);
console.log(match(amis4, source) == true)
// -----------------------------------------
