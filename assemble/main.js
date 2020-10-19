const json_hook = require('./hook');
var hook = new json_hook.json_hook()

var source = {
    "update_id": 910469164,
    "message": {
      "date": 1594795274,
      "text": "ping"
    }
  }
// load_functions
// load_plugins


var incoming = source
hook.macth_run(source, incoming, false)





//
