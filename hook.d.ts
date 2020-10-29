export declare class JsonHook {
    hooks: any;
    plugin_re_str: string;
    plugins_folder: string;
    match: any;
    strict_equality: boolean;
    constructor();
    /**
     * @description 綁定 hook條件 及 被hook函式
     * @param  {any} hook_aims 綁定的觸發條件
     * @param  {object} hook_function 滿足觸發條件後要執行的函式
     * @returns void
     */
    addHook(hook_aims: any, hook_function: object): void;
    /**
     * @description 列出以綁定的條件及函式
     * @returns {void}
     */
    listHook(): void;
    /**
     * @description 列出以綁定的條件及函式
     * @param  {object} hook_aims 要被 '觸發條件json' 比對的 '事件json'
     * @param  {object} hook_function 要被 '觸發條件json' 比對的 '事件json'
     * @param  {object} source 要被 '觸發條件json' 比對的 '事件json'
     * @param  {any} incoming? 要被傳入 '觸發函式' 的東西，可有可無
     * @param  {boolean} strict_equality? 是否要啟動嚴格比對(全等於)
     * @returns void
     */
    macthRun(hook_aims: object, hook_function: any, source: object, incoming?: any, strict_equality?: boolean): void;
    /**
     * @description loop macth all hook
     * @param  {object} source 要被 '觸發條件json' 比對的 '事件json'
     * @param  {any} incoming? 要被傳入 '觸發函式' 的東西，可有可無
     * @param  {boolean} strict_equality? 是否要啟動嚴格比對(全等於)
     * @returns void
     */
    macthRunAll(source: object, incoming?: any, strict_equality?: boolean): void;
    /**
     * @description ⚠️這個只能在 google apps script 上執行⚠️, load Google Apps Script all plugins
     * @param  {any} _this 直接傳 Google Apps Script 的 this 就好
     * @param  {any} hook? 傳入 new 出來的 hook 就好
     * @param  {string} hook_name? hook 的名稱
     * @returns void
     */
    loadGoogleAppsScriptPlugin(_this: any, hook: any, hook_name: string): void;
    /**
     * @description ⚠️這個只能在 NodeJs 上執行⚠️, load Google Apps Script all plugins
     * @param  {any} hook? 傳入 new 出來的 hook 就好
     * @param  {string} hook_name? hook 的名稱
     * @returns void
     */
    loadNodejsPlugin(hook: any, hook_name: string): void;
}
//# sourceMappingURL=hook.d.ts.map