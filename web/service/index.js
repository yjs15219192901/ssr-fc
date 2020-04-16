import { formatUrl } from "../utils";
// import { prefix } from "../utils";
const axios = require("axios");

let prefix = __isBrowser__
  ? "http://localhost:80"
  : "http://host.docker.internal:80";
export function getApi(url, params, option = {}) {
  let fullUrl = prefix + url;
  if (params) {
    fullUrl = formatUrl(fullUrl, params);
  }
  return axios(fullUrl, {
    method: "GET",
    ...option,
  });
}

export function postApi(url, data, option = {}) {
  let fullUrl = prefix + url;
  return axios(fullUrl, {
    method: "POST",
    data: data,
    ...option,
  });
}
