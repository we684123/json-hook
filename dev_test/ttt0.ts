class JsonHook {
  hooks: any
  plugin_re_str: string
  plugins_folder: string
  match: any
  strict_equality: boolean

  constructor() {
    this.hooks = []
    this.plugin_re_str = '^plugin'
    this.plugins_folder = './plugins'
    this.match = match
    this.strict_equality = false  //在 match 時要用 ==(false) 或 ===(true)
  }

  /**
   * @description 綁定 hook 條件 及 被 hook 的函式
   * @param  {any} hook_aims 綁定的觸發條件
   * @param  {object} hook_function 滿足觸發條件後要執行的函式
   * @returns void
   */
  public addHook(
    hook_aims: any,
    hook_function: object
  ): void {
    this.hooks.push([hook_aims, hook_function])
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
   * @param  {object} hook_aims 綁定的觸發條件
   * @param  {object} hook_function 滿足觸發條件後要執行的函式
   * @param  {object} source 要被 '觸發條件json' 比對的 '事件json'
   * @param  {any} incoming? 要被傳入 '觸發函式' 的東西，可有可無
   * @param  {boolean} strict_equality? 是否要啟動嚴格比對(全等於)
   * @returns void
   */
  public macthRun(
    hook_aims: object,
    hook_function: any,
    source: object,
    incoming?: any,
    strict_equality?: boolean
  ): void {
    strict_equality = strict_equality || this.strict_equality
    incoming = incoming || undefined
    if (match(hook_aims, source, strict_equality)) { // 條件符合，執行!
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
  public macthRunAll(
    source: object,
    incoming?: any,
    strict_equality?: boolean
  ): void {
    for (let [hook_aims, hook_function] of this.hooks) {
      if (match(hook_aims, source, strict_equality)) { // 條件符合，執行!
        hook_function.call(null, incoming)
      }
    }
  }

  /**
   * @description ⚠️這個只能在 google apps script 上執行⚠️, load Google Apps Script all plugins
   * @param  {any} _this 直接傳 Google Apps Script 的 this 就好
   * @param  {any} hook? 傳入 new 出來的 hook 就好
   * @param  {string} hook_name? hook 的名稱
   * @returns void
   */
  public loadGoogleAppsScriptPlugin(
    _this: any,
    hook: any,
    hook_name: string
  ): void {
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

  /**
   * @description ⚠️這個只能在 NodeJs 上執行⚠️, load Google Apps Script all plugins
   * @param  {any} hook? 傳入 new 出來的 hook 就好
   * @param  {string} hook_name? hook 的名稱
   * @returns void
   */
  public loadNodejsPlugin(
    hook: any,
    hook_name: string
  ): void {
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


interface aims_par_interface {
  'targer':string[],
  'value':any,
  'only_exist':boolean,
  'use_re':boolean,
}

interface aims_not_interface {
  'and'?:aims_par_interface[],
  'or'?:aims_par_interface[]
}

interface aims_object_interface {
  'and'?:aims_par_interface[],
  'or'?:aims_par_interface[],
  'not'?:aims_not_interface,
}

/**
 * @description 確認格式正確用，不會回傳任何值
 * @param  {aims_par_interface[]} par
 * @param  {string} from
 */
function check_parameter(par: aims_par_interface[], from: string) {
  //這裡確認 targer value... 都在
  for (var i = 0; i < par.length; i++) {
    // i = 0
    let par_i = par[i]
    if (par_i['targer'] == undefined) {
      throw `'${from}' Array ${i} targer is miss`
    }
    if (par_i['value'] == undefined) {
      throw `${from} ${i} value is miss`
    }
    if (par_i['only_exist'] == undefined) {
      throw `${from} ${i} only_exist is miss`
    }
    if (par_i['use_re'] == undefined) {
      throw `${from} ${i} use_re is miss`
    }
  }
}

// ====================================================================
// let aims_par = or[0]
/**
 * @description (要寫)
 * @param  {aims_par_interface} aims_par
 * @param  {object} source
 * @param  {boolean} strict_equality  if trun , use === , if false, use ==
 * @returns {boolean}
 */
function match_par(
  aims_par: aims_par_interface,
  source: object,
  strict_equality?: boolean
): boolean[] {
  // console.log(`aims_par = ${aims_par}`);
  // console.log(`source = ${source}`);

  let result = []
  // var iterator = aims_par[1]
  for (const iterator of aims_par) {
    console.log(`match_par iterator`);
    console.log(`iterator = ${iterator}`);
    let yn = source
    var rt = match_iterator(iterator, yn, strict_equality)
    result.push(rt)
  }
  // console.log("外層");
  return result
}

// ====================================================================
/**
 * @param  {any} iterator
 * @param  {any} yn
 * @param  {boolean} strict_equality if trun , use === , if false, use ==
 * @returns {boolean}
 */
function match_iterator(
  iterator: any,
  yn: any,
  strict_equality?: boolean
): boolean {
  for (let i = 0; i < iterator['targer'].length; i++) {
    // var i = 0
    // var i = 1
    // var i = 2
    // console.log(`i = ${i}`);
    yn = yn[iterator['targer'][i]]
    // console.log(`yn = ${yn}`);
    if (yn == undefined) {
      return false
    }
    if ((i + 1) == iterator['targer'].length) { // targer的最後一個
      // console.log("(i + 1) == iterator['targer'].length")
      if (!iterator['only_exist']) { // only_exist = false
        // console.log(`iterator['value'] = ${iterator['value']}`);
        if (iterator['use_re']) {
          // console.log(`iterator['use_re'] = ${String(iterator['use_re'])}`);
          // console.log(`iterator['value'] = ${String(iterator['value'])}`);
          let regex = RegExp(String(iterator['value']), 'g')
          return !!String(yn).match(regex)
        } else {
          if (strict_equality) {
            // console.log(yn === iterator['value']);
            return yn === iterator['value']
          } else {
            // console.log(yn == iterator['value']);
            return yn == iterator['value']
          }
        }
      }
    }
  }
  return true
}

// ====================================================================
/**
 * @description 比對看看符不符合規則，符合就執行 function
 * @param  {aims_object_interface} aims match json
 * @param  {object} source source json
 * @param  {boolean} strict_equality  if trun , use === , if false, use ==
 * @returns {boolean}
 */
function match(
  aims: aims_object_interface,
  source: object,
  strict_equality?: boolean
): boolean {
  // 先基礎定義下面4個，順便檢查
  var and = aims['and']
  var or = aims['or']
  var not_and = aims ?.not ?.and
  var not_or = aims ?.not ?.or
  if (and === undefined && or === undefined) {
    throw "'and' and 'or' at least give one.";
  }

  var and_list = []
  var or_list = []
  var not_and_list = []
  var not_or_list = []

  if (and === undefined) {
    and_list = [true]
  } else {
    check_parameter(and, 'and')
    and_list = match_par(and, source, strict_equality)
  }
  if (or === undefined) {
    or_list = [true]
  } else {
    check_parameter(or, 'or')
    or_list = match_par(or, source, strict_equality)
  }
  if (not_and === undefined) {
    not_and_list = [true]
  } else {
    check_parameter(not_and, 'not_and')
    not_and_list = match_par(not_and, source, strict_equality).map(x => !x);
  }
  if (not_or === undefined || JSON.stringify(not_or) == JSON.stringify([])) {
    not_or_list = [true]
  } else {
    check_parameter(not_or, 'not_or')
    not_or_list = match_par(not_or, source, strict_equality).map(x => !x);
  }

  var and_list_result = and_list.every(function(item) {
    return item === true
  });
  var or_list_result = or_list.some(function(item) {
    return item === true
  });
  var not_and_list_result = not_and_list.every(function(item) {
    return item === true
  });
  var not_or_list_result = not_or_list.some(function(item) {
    return item === true
  });
  var last_result = [
    and_list_result,
    or_list_result,
    not_and_list_result,
    not_or_list_result
  ]

  return last_result.every(function(item) {
    return item === true
  });
}
// ====================================================================

var source = {
  "update_id": 910469164,
  "message": {
    "message_id": 64609,
    "from": {
      "id": 207014603,
      "is_bot": false,
      "first_name": "永格天",
      "last_name": "(則天)",
      "username": "we684123",
      "language_code": "zh-hant"
    },
    "chat": {
      "id": 207014603,
      "first_name": "永格天",
      "last_name": "(則天)",
      "username": "we684123",
      "type": "private"
    },
    "date": 1594795274,
    "text": "ping"
  }
}

var aims = {
  "and": [{
    'targer': ["message", 'text'],
    'value': 'ping',
    'only_exist': false,
    'use_re': true
  }]
}

var hook = new JsonHook()
function ping(incoming) {
  console.log("get ping time = " + incoming.message.date);
}
hook.addHook(aims, ping)
console.log('plugin_ping ed');

// console.log(hook.match(amis, source) == true)
// hook.listHook()
var incoming = source
hook.macthRun(aims, ping, source,incoming)
hook.macthRunAll(source,incoming)
//
