# json-hook

一個分析 json 內容符不符合條件，符合的話就呼叫對應 function 的 hook

* * *

## 安裝 install

對! 我原本想要叫 json-hook, 結果有人先搶一步了 Orz...

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

|   Parameters  |              type              | Required |                    Description                   |
| :-----------: | :----------------------------: | :------: | :----------------------------------------------: |
|   hook_aims   | [aims_object](#aims_object-介紹) |    Yes   | 描述比對方式的json，其格式看  [aims_object](#aims_object-介紹) |
| hook_function |   function or async function   |    Yes   |               如果比對成功會執行這個 function               |

| Return | void |
| :----: | :--: |

#### hook.list()

列出當前綁定的 '觸發條件' 跟 '綁定的function'

| Return | void |
| :----: | :--: |

#### hook.macth_run(source, incoming, strict_equality)

用來綁定 '觸發條件' 與 '要被執行的 function'

|    Parameters   |   type  | Required |                       Description                       |
| :-------------: | :-----: | :------: | :-----------------------------------------------------: |
|      source     |  object |    Yes   |                  被 hook_aims 比較的 object                 |
|     incoming    |   any   |    No    |                       要被丟進綁定函數的東西                       |
| strict_equality | boolean |    No    | 預設 false , 如果false則執行相等於比較(=\\=), true則進行全等於比較(=\\=\\=) |

| Return | void |
| :----: | :--: |

<!-- ### 參數說明 parameter description

|    參數 parameter    |         說明 description         |
| :----------------: | :----------------------------: |
|       source       |           要被比對的來源json          |
|        aims        |            比對模板json            |
|     aims['and']    |    在這個array下的條件 **皆須符合** 才可以   |
|     aims['or']     |   在這個array下的條件者要 **一項符合** 就可以  |
|     aims['not']    | 在這個模式下的的 and 跟 or 會 **反轉最終結果** |
| aims['not']['and'] |   在這個array下的條件 **皆須不符合** 才可以   |
|  aims['not']['or'] |  在這個array下的條件者要 **一項不符合** 就可以  | -->

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
|     aims['not']    |           No           | 在這個模式下的的 and 跟 or 會 **反轉最終結果** |
| aims['not']['and'] |           No           |   在這個array下的條件 **皆須不符合** 才可以   |
|  aims['not']['or'] |           No           |  在這個array下的條件者要 **一項不符合** 就可以  |

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
