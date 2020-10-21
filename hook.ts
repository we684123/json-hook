import { match } from './match'
export class JsonHook {
  hooks: any
  plugin_re_str: string
  plugins_folder: string
  match: any

  constructor() {
    this.hooks = []
    this.plugin_re_str = '^plugin'
    this.plugins_folder = './plugins'
    this.match = match
  }
  /**
   * @description 綁定 hook條件 及 被hook函式
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
  public listHook(): void {
    let hookList = this.hooks
    console.log(hookList)
    for (let [key, value] of hookList) {
      console.log(key);
      console.log(value);
    }
  }
  /**
   * @description 列出以綁定的條件及函式
   * @param  {object} source 要被 '觸發條件json' 比對的 '事件json'
   * @param  {any} incoming? 要被傳入 '觸發函式' 的東西，可有可無
   * @param  {boolean} strict_equality? 是否要啟動嚴格比對(全等於)
   * @returns void
   */
  public macthRun(hook_situation: object, hook_function: any, source: object, incoming?: any, strict_equality?: boolean): void {
    if (match(hook_situation, source, strict_equality)) { // 條件符合，執行!
      hook_function.call(null, incoming)
    }
  }

  /**
   * @description loop macth all hook
   * @param  {object} source 要被 '觸發條件json' 比對的 '事件json'
   * @param  {any} incoming? 要被傳入 '觸發函式' 的東西，可有可無
   * @param  {boolean} strict_equality? 是否要啟動嚴格比對(全等於)
   * @returns void
   */
  public macthRunAll(source: object, incoming?: any, strict_equality?: boolean): void {
    for (let [hook_situation, hook_function] of this.hooks) {
      if (match(hook_situation, source, strict_equality)) { // 條件符合，執行!
        hook_function.call(null, incoming)
      }
    }
  }

  public loadGoogleAppsScriptPlugin(_this: any, hook: any, hook_name: string): void {
    hook // ㄜ... 對! 沒有用~ 只是不想看到 ts 一直提醒我沒有用 (๑-﹏-๑)
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

  public loadNodejsPlugin(hook: any, hook_name: string): void {
    hook // ㄜ... 對! 沒有用~ 只是不想看到 ts 一直提醒我沒有用 (๑-﹏-๑)
    // @ts-ignore
    const path = require('path');
    // @ts-ignore
    const fs = require('fs');

    const plugins_folder = this.plugins_folder
    // @ts-ignore
    const directoryPath = path.join(__dirname, plugins_folder);

    const file_name_re = RegExp('.+\.(ts|js|gs)$', 'g')
    const get_plugin_function_name_re = RegExp('^function\ ([^{}]+)', 'g')

    // @ts-ignore
    var files = fs.readdirSync(directoryPath);
    files.forEach(function(file: any) {
      if (!!String(file).match(file_name_re)) {
        // @ts-ignore
        var data_str = fs.readFileSync("./" + plugins_folder + "/" + file).toString();
        var i = data_str.match(get_plugin_function_name_re);
        var j = i[0].replace('function ', '');
        // 載入 plugin function 內容
        eval(data_str + '\n' + j.replace('hook', hook_name));
      }
    })
  }
}
