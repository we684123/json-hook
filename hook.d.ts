export declare class hook {
    hooks: any;
    constructor();
    /**
     * @param  {any} hook_situation 綁定的觸發條件
     * @param  {object} hook_function 滿足觸發條件後要執行的函式
     * @returns void
     */
    addHook(hook_situation: any, hook_function: object): void;
    /**
     * @description 列出以綁定的條件及函式
     * @returns {void}
     */
    list(): void;
    /**
     * @param  {object} source 要被 '觸發條件json' 比對的 '事件json'
     * @param  {any} incoming? 要被傳入 '觸發函式' 的東西，可有可無
     * @param  {boolean} strict_equality? 是否要啟動嚴格比對(全等於)
     * @returns void
     */
    macth_run(source: object, incoming?: any, strict_equality?: boolean): void;
}
//# sourceMappingURL=hook.d.ts.map