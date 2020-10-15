const json_hook = require('./hook');
var hook = new json_hook.json_hook()

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

// load_plugins
// hook.plugin_re_str = 'plcugin'
hook.load_nodejs_plugin(hook,"hook")

var incoming = source
hook.macth_run(source, incoming, false)
