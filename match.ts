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
export function check_parameter(par: aims_par_interface[], from: string) {
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
export function match_par(
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
export function match_iterator(
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
export function match(
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
