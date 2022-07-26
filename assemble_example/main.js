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

// 下面這2個是留給 ./(assemble_plugins + assemble_functions) 用的
// load_functions
// load_plugins
hook.loadNodejsPlugin(hook,"hook")
hook.loadGoogleAppsScriptPlugin(hook,"hook")
hook.matchRunAll(source, incoming, false)
