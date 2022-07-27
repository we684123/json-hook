var path = require("path");

const match = require(path.join(process.cwd(), "./match"));

const source = {
  update_id: 910469164,
  message: {
    message_id: 64609,
    from: {
      id: 207014603,
      is_bot: false,
      first_name: "永格天",
      last_name: "(則天)",
      username: "we684123",
      language_code: "zh-hant"
    },
    chat: {
      id: 207014603,
      first_name: "永格天",
      last_name: "(則天)",
      username: "we684123",
      type: "private"
    },
    date: 1594795274,
    text: "🔭 訊息狀態"
  }
};

it("1. match 'update_id' 1", () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: "123",
        only_exist: true,
        use_re: true
      }
    ]
  };
  expect(match.match(amis, source)).toBe(true);
});

it("2. match 'update_id' 2", () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: "123",
        only_exist: true,
        use_re: false
      }
    ]
  };
  expect(match.match(amis, source)).toBe(true);
});

it("3. match 'update_id' 3", () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: "123",
        only_exist: false,
        use_re: false
      }
    ]
  };
  expect(match.match(amis, source)).toBe(false);
});

it("4. match 'update_id' 4", () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: "123",
        only_exist: false,
        use_re: true
      }
    ]
  };
  expect(match.match(amis, source)).toBe(false);
});

it("5. match 'update_id' 5", () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: 123,
        only_exist: false,
        use_re: true
      }
    ]
  };
  expect(match.match(amis, source)).toBe(false);
});

it("6. match 'update_id' 6", () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: 123,
        only_exist: false,
        use_re: false
      }
    ]
  };
  expect(match.match(amis, source)).toBe(false);
});

it("7. match 'update_id' 7", () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: 910469164,
        only_exist: false,
        use_re: false
      }
    ]
  };
  expect(match.match(amis, source)).toBe(true);
});

it("8. match 'update_id' 8", () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: 910469164,
        only_exist: false,
        use_re: true
      }
    ]
  };
  expect(match.match(amis, source)).toBe(true);
});

it("9. match 'update_id' 9", () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: 910469164753,
        only_exist: false,
        use_re: true
      }
    ]
  };
  expect(match.match(amis, source)).toBe(false);
});

it("10. match 'update_id' 10", () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: "910469164",
        only_exist: false,
        use_re: true
      }
    ]
  };
  expect(match.match(amis, source)).toBe(true);
});

it("11. match 'update_id' 11", () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: "^910469164$",
        only_exist: false,
        use_re: true
      }
    ]
  };
  expect(match.match(amis, source)).toBe(true);
});

it("12. match 'update_id' 12", () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: "104691",
        only_exist: false,
        use_re: true
      }
    ]
  };
  expect(match.match(amis, source)).toBe(true);
});

it(`12. match more and_par 1`, () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: "104691",
        only_exist: false,
        use_re: true
      },
      {
        targer: ["message", "from", "is_bot"],
        value: false,
        only_exist: false,
        use_re: false
      }
    ]
  };
  expect(match.match(amis, source)).toBe(true);
});
it(`13. match more and_par 2`, () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: "104691",
        only_exist: false,
        use_re: true
      },
      {
        targer: ["message", "from", "is_bot"],
        value: false,
        only_exist: false,
        use_re: false
      }
    ]
  };
  expect(match.match(amis, source)).toBe(true);
});

it(`14. match more and_par 3`, () => {
  let amis = {
    and: [
      {
        targer: ["update_id"],
        value: "104691",
        only_exist: false,
        use_re: true
      },
      {
        targer: ["message", "from", "is_bot"],
        value: false,
        only_exist: false,
        use_re: false
      },
      {
        targer: ["message", "from", "id"],
        value: 207014603,
        only_exist: false,
        use_re: false
      }
    ]
  };
  expect(match.match(amis, source)).toBe(true);
});

const source2 = {
  update_id: 498276656,
  message: {
    message_id: 367,
    from: {
      id: 207014603,
      is_bot: false,
      first_name: "永格天",
      last_name: "(則天)",
      username: "we684123",
      language_code: "zh-hant"
    },
    chat: {
      id: -1001097080770,
      title: "逆流(超級)",
      type: "supergroup"
    },
    date: 1601312056,
    forward_from: {
      id: 207014603,
      is_bot: false,
      first_name: "永格天",
      last_name: "(則天)",
      username: "we684123",
      language_code: "zh-hant"
    },
    forward_date: 1601311963,
    photo: [
      {
        file_id:
          "AgACAgUAAx0CQWQfwgACAW9fchU4wLSwfnDwEZR4I9zJxFUlPAACMqsxGzFokFfU-3M3tdGeQ_K6Zmt0AAMBAAMCAANtAAPtfwcAARsE",
        file_unique_id: "AQAD8rpma3QAA-1_BwAB",
        file_size: 18422,
        width: 320,
        height: 180
      },
      {
        file_id:
          "AgACAgUAAx0CQWQfwgACAW9fchU4wLSwfnDwEZR4I9zJxFUlPAACMqsxGzFokFfU-3M3tdGeQ_K6Zmt0AAMBAAMCAAN4AAPufwcAARsE",
        file_unique_id: "AQAD8rpma3QAA-5_BwAB",
        file_size: 70401,
        width: 800,
        height: 450
      },
      {
        file_id:
          "AgACAgUAAx0CQWQfwgACAW9fchU4wLSwfnDwEZR4I9zJxFUlPAACMqsxGzFokFfU-3M3tdGeQ_K6Zmt0AAMBAAMCAAN5AAPvfwcAARsE",
        file_unique_id: "AQAD8rpma3QAA-9_BwAB",
        file_size: 132519,
        width: 1280,
        height: 720
      }
    ],
    caption: "不處理ok"
  }
};

it(`15. match and_par + or_par + not_par 1`, () => {
  let amis = {
    and: [
      {
        targer: ["message", "forward_from"],
        value: "",
        only_exist: true,
        use_re: false
      }
    ],
    or: [
      {
        targer: ["message", "chat", "id"],
        value: "207014603",
        only_exist: false,
        use_re: false
      },
      {
        targer: ["message", "chat", "id"],
        value: "-1001097080770",
        only_exist: false,
        use_re: false
      }
    ],
    not: {
      and: [
        {
          targer: ["message", "caption"],
          value: "不處理",
          only_exist: false,
          use_re: false
        }
      ],
      or: []
    }
  };
  expect(match.match(amis, source2)).toBe(true);
});

it(`16. match and_par + or_par + not_par`, () => {
  let amis = {
    and: [
      {
        targer: ["message", "forward_from"],
        value: "",
        only_exist: true,
        use_re: false
      }
    ],
    or: [
      {
        targer: ["message", "chat", "id"],
        value: "207014603",
        only_exist: false,
        use_re: false
      },
      {
        targer: ["message", "chat", "id"],
        value: "-1001097080770",
        only_exist: false,
        use_re: false
      }
    ],
    not: {
      and: [
        {
          targer: ["message", "caption"],
          value: "不處理ok",
          only_exist: false,
          use_re: false
        }
      ],
      or: []
    }
  };
  expect(match.match(amis, source2));
  expect(match.match(amis, source2)).toBe(false);
});
//
