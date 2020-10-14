import { match } from './match'
export class json_hook {
  hooks: any
  plugin_re_str: string

  constructor() {
    this.hooks = []
    this.plugin_re_str = '^plugin'
  }
  /**
   * @param  {any} hook_situation 綁定的觸發條件
   * @param  {object} hook_function 滿足觸發條件後要執行的函式
   * @returns void
   */
  public addHook(hook_situation: any, hook_function: object): void {
    this.hooks.push([hook_situation, hook_function])
  }
  /**
   * @description 列出以綁定的條件及函式
   * @returns {void}
   */
  public list(): void {
    let hookList = this.hooks
    console.log(hookList)
    for (let [key, value] of hookList) {
      console.log(key);
      console.log(value);
    }
  }
  /**
   * @param  {object} source 要被 '觸發條件json' 比對的 '事件json'
   * @param  {any} incoming? 要被傳入 '觸發函式' 的東西，可有可無
   * @param  {boolean} strict_equality? 是否要啟動嚴格比對(全等於)
   * @returns void
   */
  public macth_run(source: object, incoming?: any, strict_equality?: boolean): void {
    for (let [hook_situation, hook_function] of this.hooks) {
      if (match(hook_situation, source, strict_equality)) { // 條件符合，執行!
        hook_function.call(null, incoming)
      }
    }
  }

  public load_gas_plugin(_this: any, hook: any, hook_name: string) {
    for (var key in _this) {
      if (typeof _this[key] == "function") {
        let regex = RegExp(String(this.plugin_re_str), 'g')
        if (!!String(key).match(regex)) {
          let cmd = `_this.${key}(${hook_name})`
          eval(`var ${hook_name} = hook`)
          eval(cmd)
        }
      }
    }
  }

}
