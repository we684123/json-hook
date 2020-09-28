export function match(amis: any, source: any): boolean {
  // console.log(`amis = ${amis}`);
  // console.log(`source = ${source}`);

  for (const iterator of amis) {
    // console.log(`iterator = ${iterator}`);
    let yn = source
    for (let i = 0; i < iterator['targer'].length; i++) {
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
            if (yn != iterator['value']) { // 最後解出來了值不等於指定值
              // console.log("yn != iterator['value']");
              return false
            }
          }
        }
      }
    }
  }
  // console.log("外層");
  return true
}

// console.log(match(amis, source));
