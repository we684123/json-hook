import { match } from './match'
export class json_hook {
  hooks: any

  constructor() {
    this.hooks = []
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

}
