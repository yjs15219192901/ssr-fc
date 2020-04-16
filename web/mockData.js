const uuid = require("uuidjs");
export const activityData = [
  {
    ID: uuid.generate(),
    name: "软件学院校运会-学生裁判",
    description: "一年一度的软件学院校运会，提高学生身体素质",
    time: new Date("2020-03-01"),
    place: "大学城校区宿舍区运动场",
    score: {
      moral: 0.5,
      // volunteer: 0,
      // humanity: 0,
      // innovation: 0
    },
    publisher: "软件学院团委学生会",
    qualification: [
      {
        major: "软件学院软件工程",
        grade: 1,
      },
      {
        major: "软件学院软件工程",
        grade: 2,
      },
      {
        major: "软件学院软件工程",
        grade: 3,
      },
      {
        major: "软件学院软件工程",
        grade: 4,
      },
    ],
    quato: 10,
  },
  {
    ID: uuid.generate(),
    name: "软件学院校运会-方阵",
    description: "一年一度的软件学院校运会，提高学生身体素质",
    time: new Date("2020-03-01"),
    place: "大学城校区宿舍区运动场",
    score: {
      moral: 0.5,
    },
    publisher: "软件学院团委学生会",
    qualification: [
      {
        major: "软件学院软件工程",
        grade: 1,
      },
      {
        major: "软件学院软件工程",
        grade: 2,
      },
      {
        major: "软件学院软件工程",
        grade: 3,
      },
      {
        major: "软件学院软件工程",
        grade: 4,
      },
    ],
    registrationMethod: "offline",
  },
  {
    ID: uuid.generate(),
    name: "软件学院校运会-学生裁判",
    description: "一年一度的软件学院校运会，提高学生身体素质",
    time: new Date("2020-03-01"),
    place: "大学城校区宿舍区运动场",
    score: {
      volunteer: 4,
    },
    publisher: "软件学院团委学生会",
    qualification: [
      {
        major: "软件学院软件工程",
        grade: 1,
      },
      {
        major: "软件学院软件工程",
        grade: 2,
      },
      {
        major: "软件学院软件工程",
        grade: 3,
      },
      {
        major: "软件学院软件工程",
        grade: 4,
      },
    ],
    quato: 10,
    registrationMethod: "online",
  },
  {
    ID: uuid.generate(),
    name: "软件学院地铁志愿者服务",
    description: "广州各大地铁站引导志愿活动",
    time: new Date("2019-12-01"),
    place: "广州各大地铁站",
    score: {
      volunteer: 0,
    },
    publisher: "软件学院团委学生会",
    qualification: [
      {
        major: "不限",
        grade: 0,
      },
    ],
    quato: 150,
    registrationMethod: "online",
  },
  {
    ID: uuid.generate(),
    name: "软件学院地铁志愿者服务",
    description: "广州各大地铁站引导志愿活动",
    time: new Date("2019-12-01"),
    place: "广州各大地铁站",
    score: {
      volunteer: 0,
    },
    publisher: "软件学院",
    qualification: [
      {
        major: "不限",
        grade: 0,
      },
    ],
    quato: 150,
    registrationMethod: "online",
  },
  {
    ID: "eabc7ff4-8c07-4c34-8d85-1ba483c3353b",
    name: "世纪木棉讲座",
    description: `
        各二级团委（团总支）、各学生组织：
            为积极贯彻国家关于加强高校公共艺术教育的有关方针政策，弘扬中华文化与中华民族文明，丰富我校校园文化生活，提高大学生的文化艺术素养，营造良好的校园文化生态，学校定于12月10日举行“我爱你 中国——艺术与人生”专题讲座。现将有关事宜通知如下：
            一、讲座主题
            我爱你中国——艺术与人生
            二、主讲人
            瞿琮，中国人民解放军军职艺术家，国家一级编剧，诗人、作家、教授。先后出任广州军区政治部战士歌舞团团长、总政歌舞团团长、中国人民解放军交响乐团团长、解放军艺术学院院长及中国-东盟国家艺术学院学术委员会主任。
            三、讲座时间
            2019年12月10日15:00
            四、讲座地点
            华南理工大学大学城校区音乐厅
            五、相关要求：
            请各学院积极发动学生参加（人数见附件），并在活动当天以学院为单位在14:45前入场完毕。
            联系人：刘伟刚 联系电话：39380123
            欢迎大家积极踊跃参加。
        `,
    time: new Date("2019-12-10"),
    place: "华南理工大学大学城校区音乐厅",
    score: {
      volunteer: 0,
      humanity: 0.5,
    },
    publisher: "艺术学院",
    qualification: [
      {
        major: "软件学院软件工程",
        grade: 0,
      },
    ],
    quato: 0,
    registrationMethod: "online",
    applyForm: [
      {
        title: "手机号",
        inputType: "input",
        placeholder: "",
        multiple: false,
        required: true,
        options: [],
      },
      {
        title: "角色",
        inputType: "select",
        placeholder: "",
        multiple: false,
        required: true,
        options: [
          {
            optionName: "XX",
          },
          {
            optionName: "XXX",
          },
          {
            optionName: "XXXX",
          },
        ],
      },
      {
        title: "班次",
        inputType: "select",
        placeholder: "",
        multiple: true,
        required: true,
        options: [
          {
            optionName: "XX",
          },
          {
            optionName: "XXX",
          },
          {
            optionName: "XXXX",
          },
          {
            optionName: "XXXXX",
          },
          {
            optionName: "XXXXXX",
          },
          {
            optionName: "XXXXXXX",
          },
        ],
        max: 3,
      },
    ],
  },
];

export const profile = {
  name: "杨劲松",
  ID: "201630666158",
  grade: 4,
  class: "2",
  major: "软件学院软件工程",
  score: {
    humanity: 2.0,
    moral: 4.0,
    innovation: 4.0,
    volunteer: 32,
  },
  collections: [
    {
      ID: "eabc7ff4-8c07-4c34-8d85-1ba483c3353b",
      name: "世纪木棉讲座",
      description: `
            各二级团委（团总支）、各学生组织：
                为积极贯彻国家关于加强高校公共艺术教育的有关方针政策，弘扬中华文化与中华民族文明，丰富我校校园文化生活，提高大学生的文化艺术素养，营造良好的校园文化生态，学校定于12月10日举行“我爱你 中国——艺术与人生”专题讲座。现将有关事宜通知如下：
                一、讲座主题
                我爱你中国——艺术与人生
                二、主讲人
                瞿琮，中国人民解放军军职艺术家，国家一级编剧，诗人、作家、教授。先后出任广州军区政治部战士歌舞团团长、总政歌舞团团长、中国人民解放军交响乐团团长、解放军艺术学院院长及中国-东盟国家艺术学院学术委员会主任。
                三、讲座时间
                2019年12月10日15:00
                四、讲座地点
                华南理工大学大学城校区音乐厅
                五、相关要求：
                请各学院积极发动学生参加（人数见附件），并在活动当天以学院为单位在14:45前入场完毕。
                联系人：刘伟刚 联系电话：39380123
                欢迎大家积极踊跃参加。
            `,
      time: new Date("2019-12-10"),
      place: "华南理工大学大学城校区音乐厅",
      score: {
        // volunteer: 0
        humanity: 0.5,
      },
      publisher: "艺术学院",
      qualification: [
        {
          major: "软件学院软件工程",
          grade: 0,
        },
      ],
      quato: 0,
      registrationMethod: "online",
      applyForm: [
        {
          title: "手机号",
          inputType: "input",
          placeholder: "",
          multiple: false,
          required: true,
          options: [],
        },
        {
          title: "报名角色",
          inputType: "select",
          placeholder: "",
          multiple: false,
          required: true,
          options: [
            {
              optionName: "XX",
            },
            {
              optionName: "XXX",
            },
            {
              optionName: "XXXX",
            },
          ],
        },
        {
          title: "班次选择",
          inputType: "select",
          placeholder: "",
          multiple: true,
          required: true,
          options: [
            {
              optionName: "XX",
            },
            {
              optionName: "XXX",
            },
            {
              optionName: "XXXX",
            },
            {
              optionName: "XXXXX",
            },
            {
              optionName: "XXXXXX",
            },
            {
              optionName: "XXXXXXX",
            },
          ],
          max: 3,
        },
      ],
    },
  ],
};

export const admin = {
  school: "艺术学院",
  actPublished: [
    {
      ID: "eabc7ff4-8c07-4c34-8d85-1ba483c3353b",
      name: "世纪木棉讲座",
      description: `
          各二级团委（团总支）、各学生组织：
              为积极贯彻国家关于加强高校公共艺术教育的有关方针政策，弘扬中华文化与中华民族文明，丰富我校校园文化生活，提高大学生的文化艺术素养，营造良好的校园文化生态，学校定于12月10日举行“我爱你 中国——艺术与人生”专题讲座。现将有关事宜通知如下：
              一、讲座主题
              我爱你中国——艺术与人生
              二、主讲人
              瞿琮，中国人民解放军军职艺术家，国家一级编剧，诗人、作家、教授。先后出任广州军区政治部战士歌舞团团长、总政歌舞团团长、中国人民解放军交响乐团团长、解放军艺术学院院长及中国-东盟国家艺术学院学术委员会主任。
              三、讲座时间
              2019年12月10日15:00
              四、讲座地点
              华南理工大学大学城校区音乐厅
              五、相关要求：
              请各学院积极发动学生参加（人数见附件），并在活动当天以学院为单位在14:45前入场完毕。
              联系人：刘伟刚 联系电话：39380123
              欢迎大家积极踊跃参加。
          `,
      time: new Date("2019-12-10"),
      place: "华南理工大学大学城校区音乐厅",
      score: {
        // volunteer: 0
        humanity: 0.5,
      },
      publisher: "艺术学院",
      qualification: [
        {
          major: "软件学院软件工程",
          grade: 0,
        },
      ],
      quato: 0,
      registrationMethod: "online",
      applyForm: [
        {
          title: "手机号",
          inputType: "input",
          placeholder: "",
          multiple: false,
          required: true,
          options: [],
        },
        {
          title: "报名角色",
          inputType: "select",
          placeholder: "",
          multiple: false,
          required: true,
          options: [
            {
              optionName: "XX",
            },
            {
              optionName: "XXX",
            },
            {
              optionName: "XXXX",
            },
          ],
        },
        {
          title: "班次选择",
          inputType: "select",
          placeholder: "",
          multiple: true,
          required: true,
          options: [
            {
              optionName: "XX",
            },
            {
              optionName: "XXX",
            },
            {
              optionName: "XXXX",
            },
            {
              optionName: "XXXXX",
            },
            {
              optionName: "XXXXXX",
            },
            {
              optionName: "XXXXXXX",
            },
          ],
          max: 3,
        },
      ],
    },
  ],
};

export const activityAttendance = [
  {
    actId: "eabc7ff4-8c07-4c34-8d85-1ba483c3353b",
    actName: "世纪木棉讲座",
    time: new Date("2019-12-10"),
    place: "华南理工大学大学城校区音乐厅",
    score: {
      moral: 0.5,
      volunteer: 4,
    },
  },
  {
    actId: "eabc7ff4-8c07-4c34-8d85-1ba483c3353b",
    actName: "世纪木棉讲座",
    time: new Date("2019-12-10"),
    place: "华南理工大学大学城校区音乐厅",
    score: {
      moral: 0.5,
    },
  },
  {
    actId: "eabc7ff4-8c07-4c34-8d85-1ba483c3353b",
    actName: "世纪木棉讲座",
    time: new Date("2019-12-10"),
    place: "华南理工大学大学城校区音乐厅",
    score: {
      moral: 0.5,
    },
  },
  {
    actId: "eabc7ff4-8c07-4c34-8d85-1ba483c3353b",
    actName: "世纪木棉讲座",
    time: new Date("2019-12-10"),
    place: "华南理工大学大学城校区音乐厅",
    score: {
      moral: 0.5,
    },
  },
  {
    actId: "eabc7ff4-8c07-4c34-8d85-1ba483c3353b",
    actName: "世纪木棉讲座",
    time: new Date("2019-12-10"),
    place: "华南理工大学大学城校区音乐厅",
    score: {
      moral: 0.5,
    },
  },
  {
    actId: "eabc7ff4-8c07-4c34-8d85-1ba483c3353b",
    actName: "世纪木棉讲座",
    time: new Date("2019-12-10"),
    place: "华南理工大学大学城校区音乐厅",
    score: {
      moral: 0.5,
    },
  },
  {
    actId: "eabc7ff4-8c07-4c34-8d85-1ba483c3353b",
    actName: "世纪木棉讲座",
    time: new Date("2019-12-10"),
    place: "华南理工大学大学城校区音乐厅",
    score: {
      moral: 0.5,
    },
  },
  {
    actId: "eabc7ff4-8c07-4c34-8d85-1ba483c3353b",
    actName: "世纪木棉讲座",
    time: new Date("2019-12-10"),
    place: "华南理工大学大学城校区音乐厅",
    score: {
      moral: 0.5,
    },
  },
  {
    actId: "eabc7ff4-8c07-4c34-8d85-1ba483c3353b",
    actName: "世纪木棉讲座",
    time: new Date("2019-12-10"),
    place: "华南理工大学大学城校区音乐厅",
    score: {
      moral: 0.5,
    },
  },
  {
    actId: "eabc7ff4-8c07-4c34-8d85-1ba483c3353b",
    actName: "世纪木棉讲座",
    time: new Date("2019-12-10"),
    place: "华南理工大学大学城校区音乐厅",
    score: {
      moral: 0.5,
    },
  },
];

export const actApplication = [
  {
    ID: "201630666158",
    name: "杨劲松",
    applyFormValue: [
      {
        title: "角色",
        value: ["裁判员"],
      },
      {
        title: "班次",
        value: ["XXX", "XXXX"],
      },
      {
        title: "手机号",
        value: "15902056937",
      },
    ],
  },
];

export const studentAttendance = [
  {
    name: "杨劲松",
    ID: "201630666158",
    score: {
      volunteer: 4,
      humanity: 0.5,
    },
  },
];
