import { match } from './match'
export class hook {
  hooks: any

  constructor() {
    this.hooks = []
  }

  public addHook(hook_situation: any, hook_function: object): void {
    this.hooks.push([hook_situation, hook_function])
  }

  public list(): void {
    let hookList = this.hooks
    console.log(hookList)
    for (let [key, value] of hookList) {
      console.log(key);
      console.log(value);
    }
  }

  public macth_run(e: object): void {
    for (let [hook_situation, hook_function] of this.hooks) {
      // @ts-ignore
      if (match(hook_situation, e)) { // 條件符合，執行!
        hook_function.call(null, e)
      }
    }
  }

}



// let plugin = new core()
//
// plugin.run()
//
// plugin.addHook('after_run', function() {
//   console.log('an other greeting~')
// })
//
// plugin.run()


// let situation = [
//   {
//     'targer': ["message", "chat", "id"],
//     'value': 207014603,
//     'only_exist': true,
//     'use_re': false
//   }, {
//     'targer': ["message", "text"],
//     'value': '^(！|!)?ping$',
//     'only_exist': false,
//     'use_re': false
//   }
// ]
//
// async function handler(bots: any, e: any) {
//   console.log("this is ping");
//   let tgbot = bots.tgbot
//   let ed = tgbot.sendMessage(e['message']['chat']['id'], 'pong')
//   tgbot.deleteMessage(ed['chat_id'], ed['message_id'])
// }
//
// plugin.addHook(situation, handler)
// plugin.list()
// plugin.run_all()


// 030...
