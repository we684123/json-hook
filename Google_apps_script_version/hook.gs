// Compiled using undefined undefined (TypeScript 4.7.4)
var exports = exports || {};
var module = module || { exports: exports };
"use strict";
exports.JsonHook = void 0;
//import { match } from './match'
var JsonHook = /** @class */ (function () {
    function JsonHook() {
        this.hooks = [];
        this.plugin_re_str = '^plugin';
        this.plugins_folder = './plugins';
        this.match = match;
        this.strict_equality = false; //在 match 時要用 ==(false) 或 ===(true)
    }
    /**
     * @description 綁定 hook 條件 及 被 hook 的函式
     * @param  {any} hook_aims 綁定的觸發條件
     * @param  {object} hook_function 滿足觸發條件後要執行的函式
     * @returns void
     */
    JsonHook.prototype.addHook = function (hook_aims, hook_function) {
        this.hooks.push([hook_aims, hook_function]);
    };
    /**
     * @description 列出以綁定的條件及函式
     * @returns {void}
     */
    JsonHook.prototype.listHook = function () {
        var hookList = this.hooks;
        console.log(hookList);
        for (var _i = 0, hookList_1 = hookList; _i < hookList_1.length; _i++) {
            var _a = hookList_1[_i], key = _a[0], value = _a[1];
            console.log(key);
            console.log(value);
        }
    };
    /**
     * @description 列出以綁定的條件及函式
     * @param  {object} hook_aims 綁定的觸發條件
     * @param  {object} hook_function 滿足觸發條件後要執行的函式
     * @param  {object} source 要被 '觸發條件json' 比對的 '事件json'
     * @param  {any} incoming? 要被傳入 '觸發函式' 的東西，可有可無
     * @param  {boolean} strict_equality? 是否要啟動嚴格比對(全等於)
     * @returns void
     */
    JsonHook.prototype.matchRun = function (hook_aims, hook_function, source, incoming, strict_equality) {
        strict_equality = strict_equality || this.strict_equality;
        incoming = incoming || undefined;
        if (match(hook_aims, source, strict_equality)) { // 條件符合，執行!
            hook_function.call(null, incoming);
        }
    };
    /**
     * @description loop match all hook
     * @param  {object} source 要被 '觸發條件json' 比對的 '事件json'
     * @param  {any} incoming? 要被傳入 '觸發函式' 的東西，可有可無
     * @param  {boolean} strict_equality? 是否要啟動嚴格比對(全等於)
     * @returns void
     */
    JsonHook.prototype.matchRunAll = function (source, incoming, strict_equality) {
        for (var _i = 0, _a = this.hooks; _i < _a.length; _i++) {
            var _b = _a[_i], hook_aims = _b[0], hook_function = _b[1];
            if (match(hook_aims, source, strict_equality)) { // 條件符合，執行!
                hook_function.call(null, incoming);
            }
        }
    };
    /**
     * @description ⚠️這個只能在 google apps script 上執行⚠️, load Google Apps Script all plugins
     * @param  {any} _this 直接傳 Google Apps Script 的 this 就好
     * @param  {any} hook? 傳入 new 出來的 hook 就好
     * @param  {string} hook_name? hook 的名稱
     * @returns void
     */
    JsonHook.prototype.loadGoogleAppsScriptPlugin = function (_this, hook, hook_name) {
        hook; // ㄜ... 對! 沒有用~ 只是不想看到 ts 一直提醒我沒有用 (๑-﹏-๑)
        for (var key in _this) {
            if (typeof _this[key] == "function") {
                var regex = RegExp(String(this.plugin_re_str), 'g');
                if (!!String(key).match(regex)) {
                    var cmd = "_this.".concat(key, "(").concat(hook_name, ")");
                    eval("var ".concat(hook_name, " = hook"));
                    eval(cmd);
                }
            }
        }
    };
    /**
     * @description ⚠️這個只能在 NodeJs 上執行⚠️, load Google Apps Script all plugins
     * @param  {any} hook? 傳入 new 出來的 hook 就好
     * @param  {string} hook_name? hook 的名稱
     * @returns void
     */
    JsonHook.prototype.loadNodejsPlugin = function (hook, hook_name) {
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
        var files = fs.readdirSync(directoryPath);
        files.forEach(function (file) {
            if (!!String(file).match(file_name_re)) {
                // @ts-ignore
                var data_str = fs.readFileSync("./" + plugins_folder + "/" + file).toString();
                var i = data_str.match(get_plugin_function_name_re);
                var j = i[0].replace('function ', '');
                // 載入 plugin function 內容
                eval(data_str + '\n' + j.replace('hook', hook_name));
            }
        });
    };
    return JsonHook;
}());
exports.JsonHook = JsonHook;
