const isDev = process.env.local || process.env.NODE_ENV === "development";
export function cls(...args) {
  console.log("arguments", args);
  return args.join(" ");
}

export const SCORE_MAP = {
  moral: "德育分",
  innovation: "创新分",
  humanity: "人文分",
  volunteer: "志愿时",
};

export const GRADE_MAP = {
  "1": "大一",
  "2": "大二",
  "3": "大三",
  "4": "大四",
  "5": "研一",
  "6": "研二",
};

export const SCORE_COLOR_MAP = {
  moral: "green",
  humanity: "gold",
  volunteer: "magenta",
  innovation: "blue",
};

export const EXCEL_MAP = {
  姓名: "name",
  学号: "ID",
  志愿时: "volunteer",
  人文分: "humanity",
  德育分: "moral",
  创新分: "innovation",
};

export const SCHOOL_MAP = {
  software: "软件学院",
  art: "艺术学院",
};

export const SCHOOL_LIST = [
  "机械与汽车工程学院",
  "建筑学院",
  "土木与交通学院",
  "电子与信息学院",
  "材料科学与工程学院",
  "化学与化工学院",
  "轻工科学与工程学院",
  "食品科学与工程学院",
  "数学学院",
  "物理与光电学院",
  "经济与贸易学院",
  "自动化科学与工程学院",
  "计算机科学与工程学院",
  "电力学院",
  "生物科学与工程学院",
  "环境与能源学院",
  "软件学院",
  "工商管理学院（创业教育学院）",
  "公共管理学院",
  "马克思主义学院",
  "外国语学院",
  "法学院（知识产权学院）",
  "新闻与传播学院",
  "艺术学院",
  "体育学院",
  "设计学院",
  "医学院",
  "国际教育学院",
  "生物医学科学与工程学院",
  "吴贤铭智能工程学院",
  "分子科学与工程学院",
  "微电子学院",
];

export const prefix = isDev ? "/2016-08-15/proxy/ssr/page" : "";

export function formatUrl(url, paramsObj) {
  let queryString = Object.entries(paramsObj)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  if (!queryString) {
    return url;
  }
  if (url.endsWith("/")) {
    return `${url.slice(0, -1)}?${queryString}`;
  } else {
    return `${url}?${queryString}`;
  }
}

export function getFormatTime(time) {
  let DateString = new Date(time).toLocaleDateString();
  let hourString =
    new Date(time).getHours() < 10
      ? "0" + new Date(time).getHours()
      : new Date(time).getHours();
  let minuteString =
    new Date(time).getMinutes() < 10
      ? "0" + new Date(time).getMinutes()
      : new Date(time).getMinutes();
  let secondString =
    new Date(time).getSeconds() < 10
      ? "0" + new Date(time).getSeconds()
      : new Date(time).getSeconds();
  return `${DateString} ${hourString}:${minuteString}:${secondString}`;
}
