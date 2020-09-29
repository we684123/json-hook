"use strict";
exports.__esModule = true;
exports.hook = void 0;
var match_1 = require("./match");
var hook = /** @class */ (function () {
    function hook() {
        this.hooks = [];
    }
    hook.prototype.addHook = function (hook_situation, hook_function) {
        this.hooks.push([hook_situation, hook_function]);
    };
    hook.prototype.list = function () {
        var hookList = this.hooks;
        console.log(hookList);
        for (var _i = 0, hookList_1 = hookList; _i < hookList_1.length; _i++) {
            var _a = hookList_1[_i], key = _a[0], value = _a[1];
            console.log(key);
            console.log(value);
        }
    };
    hook.prototype.macth_run = function (e, strict_equality) {
        for (var _i = 0, _a = this.hooks; _i < _a.length; _i++) {
            var _b = _a[_i], hook_situation = _b[0], hook_function = _b[1];
            if (match_1.match(hook_situation, e, strict_equality)) { // 條件符合，執行!
                hook_function.call(null, e);
            }
        }
    };
    return hook;
}());
exports.hook = hook;
// let plugin = new core()
//
// plugin.run()
//
// plugin.addHook('after_run', function() {
//   console.log('an other greeting~')
// })
//
// plugin.run()
// let situation = [
//   {
//     'targer': ["message", "chat", "id"],
//     'value': 207014603,
//     'only_exist': true,
//     'use_re': false
//   }, {
//     'targer': ["message", "text"],
//     'value': '^(！|!)?ping$',
//     'only_exist': false,
//     'use_re': false
//   }
// ]
//
// async function handler(bots: any, e: any) {
//   console.log("this is ping");
//   let tgbot = bots.tgbot
//   let ed = tgbot.sendMessage(e['message']['chat']['id'], 'pong')
//   tgbot.deleteMessage(ed['chat_id'], ed['message_id'])
// }
//
// plugin.addHook(situation, handler)
// plugin.list()
// plugin.run_all()
// 030...
//# sourceMappingURL=hook.js.map