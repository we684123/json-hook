const json_hook = require('./hook');
var hook = new json_hook.JsonHook()

var source = {
    "update_id": 910469164,
    "message": {
      "date": 1594795274,
      "text": "ping"
    }
  }
var incoming = source

// load_functions
// load_plugins


hook.matchRunAll(source, incoming, false)
