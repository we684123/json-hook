const json_hook = require('./hook');
var hook = new json_hook.JsonHook()

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
    "text": "ping"
  }
}

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

// console.log(hook.match(amis, source) == true)
// hook.listHook()
hook.macthRun(hook, ping, source)

//
