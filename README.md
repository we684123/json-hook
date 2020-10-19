# json-hook

一個分析 json 內容符不符合條件，符合的話就呼叫對應 function 的 hook。    
理論上能夠適應各種支援純js的平台。    

if source json match aims_object , cell hook function.    
In theory, it can be adapted to various platforms that support pure js.     

* * *

## 安裝 install

對! 我原本想要叫 json-hook, 結果有人先搶一步了 Orz...    

I originally wanted to call json-hook, but somebody got the first step. Orz...    

### npm install

    npm i -g json-hook-trigger

### google apps script library install

打開 gs 編輯頁面  
-> "資源"  
-> "程式庫"  
-> 將 `1lfFZa5p7bjHeYIQ0iFwKaE5HnS3ypK2vRVuZaonnXTQLzc0dZBcgeepO` 貼上輸入框  
-> "新增"  
-> 選擇最後版本(記得阿 不然儲存不了)  
-> "儲存"~    

Open Script Editor.  
-> Resource  
-> Library  
-> Paste Script ID `1lfFZa5p7bjHeYIQ0iFwKaE5HnS3ypK2vRVuZaonnXTQLzc0dZBcgeepO` to box  
-> Add library  
-> select lastest version and save    

* * *

## 使用 use

### import in NodeJs

```javascript
const json_hook = require('json-hook-trigger');
var hook = new json_hook.json_hook()
```

### import in TypeScript

```javascript
import {json_hook} from 'json-hook-trigger'
var hook = new json_hook()
```

### import in Google Apps Script

```javascript
var hook = new jsonhook.json_hook()
// 'jsonhook' is follow "Identifier"
```

```javascript
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

function ping(incoming) {
  console.log("get ping time = " + incoming.message.date);
}
hook.addHook(aims, ping)
var incoming = source
hook.macth_run(source,incoming,false) // get ping time = 1594795274
```

* * *

## 說明 Description

### 函式說明 function description

#### hook.addHook(hook_aims, hook_function)

用來綁定 '觸發條件' 與 '要被執行的 function'    
hook a 'condition' to 'function'    

|   Parameters  |              type              | Required |                    Description                   |
| :-----------: | :----------------------------: | :------: | :----------------------------------------------: |
|   hook_aims   | [aims_object](#aims_object-介紹) |    Yes   | 描述比對方式的json，其格式看  [aims_object](#aims_object-介紹) |
| hook_function |   function or async function   |    Yes   |               如果比對成功會執行這個 function               |

| Return | void |
| :----: | :--: |

#### hook.list()

列出當前綁定的 '觸發條件' 跟 '綁定的function'    
print hook 'condition' and 'hook function'    

| Return | void |
| :----: | :--: |

#### hook.macth_run(source, incoming, strict_equality)

用來綁定 '觸發條件' 與 '要被執行的 function'

|    Parameters   |   type  | Required |                             Description                            |
| :-------------: | :-----: | :------: | :----------------------------------------------------------------: |
|      source     |  object |    Yes   |                       被 hook_aims 比較的 object                       |
|     incoming    |   any   | Optional |                             要被丟進綁定函數的東西                            |
| strict_equality | boolean | Optional | 預設 false ,<br> 如果 false 則執行相等於比較(=\\=),<br> true 則進行全等於比較(=\\=\\=) |

| Return | void |
| :----: | :--: |

#### load_gas_plugin(this, hook, hook_name)

**⚠️這個只能在 google apps script 上執行⚠️**  
**⚠️This can only be used on google apps script⚠️**    

能夠自動執行符合 Regex 規則的 function，用來自動載入 plugin。      
Able to automatically execute functions that comply with Regex rules      
Used to automatically load plugin    

| Parameters |  type  | Required |   Description  |
| :--------: | :----: | :------: | :------------: |
|    this    | object |    Yes   | 只能是 this, 不能更改 |
|    hook    | object |    Yes   |     hook 本體    |
|  hook_name | string |    Yes   | hook 的名稱，一定要一樣 |

| Return | void |
| :----: | :--: |

##### load_gas_plugin example:

1.  main file

```javascript
function main() {
  var hook = new jsonhook.json_hook()
  // 'jsonhook' is follow "Identifier"

  var source = {
    "update_id": 910469164,
    "message": {
      "date": 1594795274,
      "text": "ping"
    }
  }

  // load_plugins
  // hook.plugin_re_str = '^plugins'  // <- Optional, RegExp text
  hook.load_gas_plugin(this, hook, "hook")

  var incoming = source
  hook.macth_run(source, incoming, false) // get ping time = 1594795274
}
```

2.  plugin file

```javascript
function plugin_ping(hook){
  var aims = {
    "and": [{
      'targer': ["message", 'text'],
      'value': 'ping',
      'only_exist': false,
      'use_re': true
    }]
  }

  function ping(incoming) {
    console.log("get ping time = " + incoming.message.date);
  }
  hook.addHook(aims, ping)
}
```

#### load_nodejs_plugin(hook, hook_name)

**⚠️這個只能在 NodeJs 上執行⚠️**  
**⚠️This can only be used on NodeJs⚠️**    

使用後會自動載入 ./plugins 資料夾，並將模組引入。      
After use, it will automatically load the **"./plugins"** folder and import the module    

| Parameters |  type  | Required |   Description  |
| :--------: | :----: | :------: | :------------: |
|    hook    | object |    Yes   |     hook 本體    |
|  hook_name | string |    Yes   | hook 的名稱，一定要一樣 |

| Return | void |
| :----: | :--: |

##### load_nodejs_plugin example:

1.  main file

```javascript
function main() {
  const json_hook = require('./hook');
  var hook = new json_hook.json_hook()

  var source = {
    "update_id": 910469164,
    "message": {
      "date": 1594795274,
      "text": "ping"
    }
  }

  // load_plugins
  hook.load_nodejs_plugin(hook,"hook")

  var incoming = source
  hook.macth_run(source, incoming, false) // get ping time = 1594795274
}
```

2.  plugin file ("./plugins/ping.js")

```javascript
function plugin_ping(hook){
  var aims = {
    "and": [{
      'targer': ["message", 'text'],
      'value': 'ping',
      'only_exist': false,
      'use_re': true
    }]
  }

  function ping(incoming) {
    console.log("get ping time = " + incoming.message.date);
  }
  hook.addHook(aims, ping)
}
```

#### plugin_re_str

plugin_re_str 型別是 string      
用來當作 RegExp 的字串    
**配合 load_gas_plugin() 使用**    
預設是 "^plugin"    

this type is string      
set RegExp text (for match function)    
**Use with load_gas_plugin()**    
The default is "^plugin"    

#### plugins_folder

plugins_folder 型別是 string      
用來表示 plugins 的資料夾位置    
**配合 load_nodejs_plugin() 使用**    
預設是 "./plugins"    

plugins_folder type is string    
Used to indicate the folder location of plugins    
**Use with load_nodejs_plugin()**    
The default is'./plugins'    

* * *

### aims_object 介紹

aims_object 只是一個特定格式的 object。    
其內包含 and、or、not 三個條件    

顧名思義，and 內列的條件皆須遵守，or 則只要有一個遵守就好    
not 則是會把結果反過來，所以    
aims['not']['and'] 是皆須不符合    
aims['not']['or'] 則是任一不符合    

|    參數 parameter    |        Required        |         說明 description         |
| :----------------: | :--------------------: | :----------------------------: |
|        aims        |           Yes          |            比對模板json            |
|     aims['and']    |  如果沒有 aims['or']，則 Yes |    在這個array下的條件 **皆須符合** 才可以   |
|     aims['or']     | 如果沒有 aims['and']，則 Yes |   在這個array下的條件者要 **一項符合** 就可以  |
|     aims['not']    |        Optional        | 在這個模式下的的 and 跟 or 會 **反轉最終結果** |
| aims['not']['and'] |        Optional        |   在這個array下的條件 **皆須不符合** 才可以   |
|  aims['not']['or'] |        Optional        |  在這個array下的條件者要 **一項不符合** 就可以  |

#### 範例 example

```javascript
amis = {
  // source['message']['forward_from'] 必須存在
  "and": [{
    'targer': ["message", "forward_from"],
    'value': '',
    'only_exist': true,
    'use_re': false
  }],
  // 當 source['message']['chat']['id'] 為 207014603 或 -1001097080770 都可以接受
  "or": [{
    'targer': ["message", "chat", "id"],
    'value': '207014603',
    'only_exist': false,
    'use_re': false
  }, {
    'targer': ["message", "chat", "id"],
    'value': '-1001097080770',
    'only_exist': false,
    'use_re': false
  }],
  // 不接受當 source['message']['caption'] 等於 '不處理k' 的時候
  "not": {
    "and": [{
      'targer': ["message", "caption"],
      'value': '不處理k',
      'only_exist': false,
      'use_re': false
    }],
    "or": []
  }
}
```

### 比對條件格式 condition format

```javascript
{
  'targer': ["message", "caption"],
  'value': '不處理',
  'only_exist': false,
  'use_re': false
}
```

| 參數 parameter |     type     | Required |       說明 description       |
| :----------: | :----------: | :------: | :------------------------: |
|    targer    | String Array |    Yes   |        字串陣列，用來尋找指定目標       |
|     value    |      any     |    Yes   |          比對指定目標的值          |
|  only_exist  |    boolean   |    Yes   | 是否只要指定目標存在就好(!= undefined) |
|    use_re    |    boolean   |    Yes   |       是否啟用 Regex 比對模式      |

## 整合模組、函式 assemble plugin、function
如果你的執行環境不是 google Apps Script、NodeJs    
或是你想要將所有的程式碼整合在一起，以便更新之類的...

那麼可以考慮使用
`assemble_plugins.py` 將 plugins 直接整合到一個檔案    
`assemble_functions.py` 將 functions 直接整合到一個檔案    

⚠️環境要求 `Python >= 3.4`⚠️

二者用法說明如下：    

1. `python assemble_plugins.py --help`

```
Usage: assemble_plugins.py [OPTIONS]

Options:
  -i, --input TEXT             程式本體(main.js)，預設 "./main.js"
  -p, --plugins_folder TEXT    plugins 資料夾的位置，預設 "./plugins"
  -a, --annotation TEXT        註解的名稱，預設是 "// load_plugins"
  -n, --new_name TEXT          新檔案的名稱，預設是 "main.ass.js"
  -h, --hide_folder_name TEXT  忽略的資料夾名稱，預設是 "hide"
  --help                       Show this message and exit.
```

2. `python assemble_functions.py --help`

```
Usage: assemble_functions.py [OPTIONS]

Options:
  -i, --input TEXT             程式本體(main.js)，預設 "./main.js"
  -f, --functions_folder TEXT  functions 資料夾的位置，預設 "./functions"
  -a, --annotation TEXT        註解的名稱，預設是 "// load_functions"
  -n, --new_name TEXT          新檔案的名稱，預設是 "main.ass.js"
  -h, --hide_folder_name TEXT  忽略的資料夾名稱，預設是 "hide"
  --help                       Show this message and exit.
```

你可以下載這個專案後，在`./assemble` 下找到他們    
在你操作過後會發現，他們會把指定資料夾下的所有檔案引入並處理    
但會忽略掉資料夾名等於 "hide" (可由 `--hide_folder_name` 指定) 內的檔案。    

ps' 我有順便用 win x64 的版本，有需要可以使用。    

## 版本資訊 Version

2020/10/19 - (v1.4.0)    
 - 新增 `assemble_plugins` , `assemble_functions`    
   現在可以樹狀引入資料，還有 hide 功能。    
 - 移除 `assemble.py`    
 - 部分 code 重構，變得在好看一點~    

2020/10/18 - (v1.3.0)    
 - 新增 assemble.py、 assemble_win_x64.exe，用來解決跨平台問題    

2020/10/17 - (v1.2.0)    
 - 新增 load_nodejs_plugin    

2020/10/15 - (v1.1.0)    
 - 新增 load_gas_plugin    

2020/10/08 - (v1.0.0)    
 - 初發布    

## todo
 - ~~一個 py or node 可執行的檔案，用來將 plugins 內的檔案全部塞入主程式中。~~    
 - ~~支援 functions 匯入~~    
 - 教學影片    
