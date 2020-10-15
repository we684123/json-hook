"use strict";
exports.__esModule = true;
exports.json_hook = void 0;
var match_1 = require("./match");
var json_hook = /** @class */ (function () {
    function json_hook() {
        this.hooks = [];
        this.plugin_re_str = '^plugin';
        this.plugins_folder = './plugins';
    }
    /**
     * @param  {any} hook_situation 綁定的觸發條件
     * @param  {object} hook_function 滿足觸發條件後要執行的函式
     * @returns void
     */
    json_hook.prototype.addHook = function (hook_situation, hook_function) {
        this.hooks.push([hook_situation, hook_function]);
    };
    /**
     * @description 列出以綁定的條件及函式
     * @returns {void}
     */
    json_hook.prototype.list = function () {
        var hookList = this.hooks;
        console.log(hookList);
        for (var _i = 0, hookList_1 = hookList; _i < hookList_1.length; _i++) {
            var _a = hookList_1[_i], key = _a[0], value = _a[1];
            console.log(key);
            console.log(value);
        }
    };
    /**
     * @param  {object} source 要被 '觸發條件json' 比對的 '事件json'
     * @param  {any} incoming? 要被傳入 '觸發函式' 的東西，可有可無
     * @param  {boolean} strict_equality? 是否要啟動嚴格比對(全等於)
     * @returns void
     */
    json_hook.prototype.macth_run = function (source, incoming, strict_equality) {
        for (var _i = 0, _a = this.hooks; _i < _a.length; _i++) {
            var _b = _a[_i], hook_situation = _b[0], hook_function = _b[1];
            if (match_1.match(hook_situation, source, strict_equality)) { // 條件符合，執行!
                hook_function.call(null, incoming);
            }
        }
    };
    json_hook.prototype.load_gas_plugin = function (_this, hook, hook_name) {
        hook; // ㄜ... 對! 沒有用~ 只是不想看到 ts 一直提醒我沒有用 (๑-﹏-๑)
        for (var key in _this) {
            if (typeof _this[key] == "function") {
                var regex = RegExp(String(this.plugin_re_str), 'g');
                if (!!String(key).match(regex)) {
                    var cmd = "_this." + key + "(" + hook_name + ")";
                    eval("var " + hook_name + " = hook");
                    eval(cmd);
                }
            }
        }
    };
    json_hook.prototype.load_nodejs_plugin = function (hook, hook_name) {
        hook; // ㄜ... 對! 沒有用~ 只是不想看到 ts 一直提醒我沒有用 (๑-﹏-๑)
        // @ts-ignore
        var path = require('path');
        // @ts-ignore
        var fs = require('fs');
        var plugins_folder = this.plugins_folder;
        // @ts-ignore
        var directoryPath = path.join(__dirname, plugins_folder);
        var file_name_re = RegExp('.+\.(ts|js|gs)$', 'g');
        var get_plugin_function_name_re = RegExp('^function\ ([^{}]+)', 'g');
        // @ts-ignore
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            // @ts-ignore
            files.forEach(function (file) {
                if (!!String(file).match(file_name_re)) {
                    console.log(file);
                    // @ts-ignore
                    fs.readFile("./" + plugins_folder + "/" + file, function (err, data) {
                        if (err)
                            throw err;
                        var data_str = data.toString();
                        var i = data_str.match(get_plugin_function_name_re);
                        var j = i[0].replace('function ', '');
                        console.log(j);
                        eval(data_str); // 載入 plugin function 內容
                        eval(j.replace('hook', hook_name)); // 執行 plugin function
                    });
                }
            });
        });
    };
    return json_hook;
}());
exports.json_hook = json_hook;
//# sourceMappingURL=hook.js.map