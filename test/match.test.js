var path = require('path');

const match = require(path.join(process.cwd(),"./match"));

const source = {
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
    "text": "🔭 訊息狀態"
  }
}



var amis = {"and":[
  {
    'targer': ["update_id"],
    'value': '123',
    'only_exist': true,
    'use_re': true
  }
]}


it('match update_id only_exist', () => {
  expect(match.match(amis, source)).toBe(true);
});
