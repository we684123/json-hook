/**
 * @description 確認 par 格式正確用，不會回傳任何值，但格式錯了會直接噴錯
 * @param  {any} par par 本體
 * @param  {string} from 來自 aims_par 的哪個屬性 (and、or、not_and、not_or)
 */
export function check_parameter(par: any, from: string): void {
  //這裡確認 targer value... 都在
  for (let i = 0; i < par.length; i++) {
    // i = 0
    const par_i = par[i]
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
/**
 * @description match_par 用來比對 source 是否符合每個 aims_par 要求
 * @param  {any} aims_par aims_par本體
 * @param  {object} source source json
 * @param  {boolean} strict_equality  if trun , use === , if false, use ==
 * @returns {boolean[]} result 回傳比對結果的 boolean[]
 */
export function match_par(
  aims_par: any,
  source: object,
  strict_equality?: boolean
): boolean[] {
  // 下面輔助理解code用
  // aims["and"]的
  // var aims_par = [
  //   {
  //     "targer": ['message', 'text'],
  //     "value": 'ping',
  //     "only_exist": false,
  //     "use_re": true
  //   }
  // ]
  // var strict_equality = false

  // console.log(`aims_par = ${aims_par}`);
  // console.log(`source = ${source}`);

  // 回傳比對結果的 boolean[]
  const result: boolean[] = []
  // var iterator = aims_par[1]
  for (const iterator of aims_par) {

    // console.log(`iterator = ${JSON.stringify(iterator)}`);
    const yn = source
    const rt = match_iterator(iterator, yn, strict_equality)
    result.push(rt)
  }
  // console.log("外層");
  return result
}

// ====================================================================
/**
 * @param  {any} iterator iterator 是 aims_par 迭代出來的元素
 * @param  {any} yn yn 是 source 的 copy 但每次進迴圈會被剝掉最上面的一層
 * @param  {boolean} strict_equality if trun , use === , if false, use ==
 * @returns {boolean} 比對結果
 */
export function match_iterator(
  iterator: any,
  yn: any,
  strict_equality?: boolean
): boolean {
  // 下面輔助理解code用
  // var iterator = {
  //   "targer": ["message", "text"],
  //   "value": "ping",
  //   "only_exist": false,
  //   "use_re": true
  // }
  // var yn = source

  // 看 targer 有幾個元素就往下探幾層
  // i 代表下探的層數
  for (let i = 0; i < iterator['targer'].length; i++) {
    // var i = 0
    // var i = 1
    // var i = 2
    // console.log(`i = ${i}`);
    // 例如上面的 iterator，在第0層時會是 "message"，第1層就是 "text"
    // 那 iterator['targer'][i] 等於 "message"
    // 然後就變成 yn = yn["message"]
    // 這樣就成功剝掉 yn 的最外層
    yn = yn[iterator['targer'][i]]
    // console.log(`yn = ${yn}`);
    if (yn == undefined) {
      // 一旦 yn == undefined 就代表與 iterator 設定條件不同
      // 直接回傳比對失敗的 false
      return false
    }
    if ((i + 1) == iterator['targer'].length) { // targer的最後一個
      //但如果成功剝到最後一層
      // console.log("(i + 1) == iterator['targer'].length")
      if (!iterator['only_exist']) { // only_exist = false
        // 且不是只要有 "東西" 就好的情況下就繼續比對
        // console.log(`iterator['value'] = ${iterator['value']}`);
        // 看要不要用正則表達式比對
        if (iterator['use_re']) { // 用正則表達式比對
          // console.log(`iterator['use_re'] = ${String(iterator['use_re'])}`);
          // console.log(`iterator['value'] = ${String(iterator['value'])}`);
          const regex = RegExp(String(iterator['value']), 'g')
          return !!String(yn).match(regex)
        } else {  // 不用正則表達式比對
          // 看要不要用 "===" 進行比對
          if (strict_equality) {
            // 用 "===" 進行比對，並回傳結果
            // console.log(yn === iterator['value']);
            return yn === iterator['value']
          } else {
            // 用 "==" 進行比對，並回傳結果
            // console.log(yn == iterator['value']);
            return yn == iterator['value']
          }
        }
      } // iterator['only_exist'] == true, 回傳 true
    }
  }
  return true
}

// ====================================================================
/**
 * @description 比對看看符不符合規則，符合就執行 function
 * @param  {any} aims match json
 * @param  {object} source source json
 * @param  {boolean} strict_equality  if trun , use === , if false, use ==
 * @returns {boolean} 比對結果
 */
export function match(
  aims: any,
  source: object,
  strict_equality?: boolean
): boolean {
  // 下面輔助理解code用
  // var strict_equality = false

  // 先基礎定義下面4個，順便檢查
  const and = aims['and']
  const or = aims['or']
  const not_and = aims ?.not ?.and
  const not_or = aims ?.not ?.or
  if (and === undefined && or === undefined) {
    throw "'and' and 'or' at least give one.";
  }

  // 以下4個的 boolean[] 用來儲存比對結果
  let and_list: boolean[] = []
  let or_list: boolean[] = []
  let not_and_list: boolean[] = []
  let not_or_list: boolean[] = []

  // 以下比對並儲存比對結果
  if (and === undefined) {
    // aims中如果沒有 "and", 則直接當作比對吻合
    and_list = [true]
  } else {
    check_parameter(and, 'and')
    and_list = match_par(and, source, strict_equality)
  }
  if (or === undefined) {
    // aims中如果沒有 "or", 則直接當作比對吻合
    or_list = [true]
  } else {
    check_parameter(or, 'or')
    or_list = match_par(or, source, strict_equality)
  }
  if (not_and === undefined) {
    // aims中如果沒有 "not_and_list", 則直接當作比對吻合
    not_and_list = [true]
  } else {
    check_parameter(not_and, 'not_and')
    // 這裡有因為是用 not，所以補上一個反轉用的 map
    not_and_list = match_par(not_and, source, strict_equality).map(x => !x);
  }
  if (not_or === undefined || JSON.stringify(not_or) == JSON.stringify([])) {
    // aims中如果沒有 "not_or_list", 則直接當作比對吻合
    not_or_list = [true]
  } else {
    check_parameter(not_or, 'not_or')
    // 這裡有因為是用 not，所以補上一個反轉用的 map
    not_or_list = match_par(not_or, source, strict_equality).map(x => !x);
  }

  // 以下依 aims 設定的條件去生成結果
  // 例如用 and 的就必須每項都符合才能給 true，所以用 Array.every 檢查
  // 而用 or 的只要一項符合就可以給 true，所以用 Array.some 檢查
  // not_and_list 跟 not_or_list 前面已經用 map 反轉過了
  const and_list_result = and_list.every(function(item) {
    return item === true
  });
  const or_list_result = or_list.some(function(item) {
    return item === true
  });
  const not_and_list_result = not_and_list.every(function(item) {
    return item === true
  });
  const not_or_list_result = not_or_list.some(function(item) {
    return item === true
  });
  const last_result = [
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
