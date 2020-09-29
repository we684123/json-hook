var source = {
  "update_id": 498276656,
  "message": {
    "message_id": 367,
    "from": {
      "id": 207014603,
      "is_bot": false,
      "first_name": "永格天",
      "last_name": "(則天)",
      "username": "we684123",
      "language_code": "zh-hant"
    },
    "chat": {
      "id": -1001097080770,
      "title": "逆流(超級)",
      "type": "supergroup"
    },
    "date": 1601312056,
    "forward_from": {
      "id": 207014603,
      "is_bot": false,
      "first_name": "永格天",
      "last_name": "(則天)",
      "username": "we684123",
      "language_code": "zh-hant"
    },
    "forward_date": 1601311963,
    "photo": [{
      "file_id": "AgACAgUAAx0CQWQfwgACAW9fchU4wLSwfnDwEZR4I9zJxFUlPAACMqsxGzFokFfU-3M3tdGeQ_K6Zmt0AAMBAAMCAANtAAPtfwcAARsE",
      "file_unique_id": "AQAD8rpma3QAA-1_BwAB",
      "file_size": 18422,
      "width": 320,
      "height": 180
    }, {
      "file_id": "AgACAgUAAx0CQWQfwgACAW9fchU4wLSwfnDwEZR4I9zJxFUlPAACMqsxGzFokFfU-3M3tdGeQ_K6Zmt0AAMBAAMCAAN4AAPufwcAARsE",
      "file_unique_id": "AQAD8rpma3QAA-5_BwAB",
      "file_size": 70401,
      "width": 800,
      "height": 450
    }, {
      "file_id": "AgACAgUAAx0CQWQfwgACAW9fchU4wLSwfnDwEZR4I9zJxFUlPAACMqsxGzFokFfU-3M3tdGeQ_K6Zmt0AAMBAAMCAAN5AAPvfwcAARsE",
      "file_unique_id": "AQAD8rpma3QAA-9_BwAB",
      "file_size": 132519,
      "width": 1280,
      "height": 720
    }],
    "caption": "不處理k"
  }
}

// match(aims7, source)
var aims7 = {
  "and": [{
    'targer': ["message", "forward_from"],
    'value': '',
    'only_exist': true,
    'use_re': false
  },],
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
  },],
  "not": {
    "and": [{
      'targer': ["message", "caption"],
      'value': '不處理',
      'only_exist': false,
      'use_re': false
    }],
    "or": []
  },
}

// ====================================================================
// let aims_par = or[0]
function match_par(aims_par: any, source: object): boolean[] {
  // console.log(`aims_par = ${aims_par}`);
  // console.log(`source = ${source}`);

  let result = []
  // var iterator = aims_par[1]
  for (const iterator of aims_par) {
    // console.log(`iterator = ${iterator}`);
    let yn = source
    var rt = match_iterator(iterator, yn)
    result.push(rt)
  }
  // console.log("外層");
  return result
}
// ====================================================================
function match_iterator(iterator: any, yn: any): any {
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
          // console.log(yn != iterator['value']);
          return yn == iterator['value']
          // if (yn == iterator['value']) { // 最後解出來了值不等於指定值
          //   console.log("yn != iterator['value']");
          //   return false
          // }
        }
      }
    }
  }
  return true
}
// ====================================================================
function check_parameter(par: any, from: string) {
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
// var aims = aims7
function match(aims: any, source: object): boolean {
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
    and_list = match_par(and, source)
  }
  if (or === undefined) {
    or_list = [true]
  } else {
    check_parameter(or, 'or')
    or_list = match_par(or, source)
  }
  if (not_and === undefined) {
    not_and_list = [true]
  } else {
    check_parameter(not_and, 'not_and')
    not_and_list = match_par(not_and, source).map(x => !x);
  }
  if (not_or === undefined || JSON.stringify(not_or) == JSON.stringify([])) {
    not_or_list = [true]
  } else {
    check_parameter(not_or, 'not_or')
    not_or_list = match_par(not_or, source).map(x => !x);
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

var arr = [true, true, true, true];

arr.every(function(item) {
  // console.log(item, index, array); // 物件, 索引, 全部陣列
  return item === true
});

match(aims7, source)

var fg = aims7['or']
match_par(fg, source)
