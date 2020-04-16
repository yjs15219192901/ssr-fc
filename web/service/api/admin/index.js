import { postApi, getApi } from "../../index";
const adminPrefix = "/api/admin";

const ADD_ACT_URL = "/add_activity";
const GET_ACT_LIST_URL = "/act_list";
const GET_ADMIN_URL = "/get_admin";
const UPDATE_ACT_URL = "/update_activity";
const LOG_SCORE_URL = "/log_score";
const GET_LOG_SCORE_URL = "/get_log_score";
const DEL_SCORE_URL = "/delete_score";

export function addActivity(data) {
  let fullUrl = adminPrefix + ADD_ACT_URL;
  return postApi(fullUrl, data);
}

export function adminGetActList(context) {
  let fullUrl = adminPrefix + GET_ACT_LIST_URL;
  return getApi(
    fullUrl,
    {},
    {
      headers: __isBrowser__ ? {} : context.req.headers, //node端发送请求带上原始header
      withCredentials: true,
    }
  );
}

export function getAdmin(context) {
  let fullUrl = adminPrefix + GET_ADMIN_URL;
  return getApi(
    fullUrl,
    {},
    {
      headers: __isBrowser__ ? {} : context.req.headers, //node端发送请求带上原始header
      withCredentials: true,
    }
  );
}

export function updateActivity(id, data) {
  let fullUrl = `${adminPrefix}${UPDATE_ACT_URL}?id=${id}`;
  return postApi(fullUrl, data);
}

export function logScore(id, data) {
  let fullUrl = `${adminPrefix}${LOG_SCORE_URL}?id=${id}`;
  return postApi(fullUrl, data, { withCredentials: true });
}

export function getLogScore(id) {
  let fullUrl = adminPrefix + GET_LOG_SCORE_URL;
  return getApi(fullUrl, { id });
}

export function deleteScore(id, data) {
  let fullUrl = `${adminPrefix}${DEL_SCORE_URL}?id=${id}`;
  return postApi(fullUrl, data, { withCredentials: true });
}
