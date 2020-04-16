import { getApi, postApi } from "../../index";

const studentPrefix = "/api/student";
const GET_ACT_LIST_URL = "/act_list";
const GET_PROFILE_URL = "/profile";
const COLLECT_ACT_URL = "/collect_act";
const CANCEL_COLLECT_ACT_URL = "/cancel_collect_act";
const APPLY_ACT_URL = "/apply_for_act";
const GET_APPLICATION_URL = "/get_application";
const GET_COLLECTIONS_URL = "/get_collections";
const GET_ATTENDANCE_URL = "/get_attendance";
const CANCEL_APPLICATION_URL = "/cancel_application";

export function getActList(context) {
  let fullUrl = studentPrefix + GET_ACT_LIST_URL;
  return getApi(
    fullUrl,
    {},
    {
      headers: __isBrowser__
        ? {}
        : {
            ...context.req.headers, //请求由node端预取数据时发出，需要把header里的cookie信息带上
          },
      withCredentials: true,
    }
  );
}

export function getProfile(context) {
  let fullUrl = studentPrefix + GET_PROFILE_URL;
  return getApi(
    fullUrl,
    {},
    {
      headers: __isBrowser__
        ? {}
        : {
            ...context.req.headers,
          },
      withCredentials: true,
    }
  );
}

export function collectAct(actId) {
  let fullUrl = studentPrefix + COLLECT_ACT_URL;
  return postApi(fullUrl, { id: actId }, { withCredentials: true });
}

export function cancelCollectAct(actId) {
  let fullUrl = studentPrefix + CANCEL_COLLECT_ACT_URL;
  return postApi(fullUrl, { id: actId }, { withCredentials: true });
}

export function applyForAct(applyData) {
  let fullUrl = studentPrefix + APPLY_ACT_URL;
  return postApi(fullUrl, { data: applyData }, { withCredentials: true });
}

export function getApplication(context) {
  let fullUrl = studentPrefix + GET_APPLICATION_URL;
  return getApi(
    fullUrl,
    {},
    {
      headers: __isBrowser__ ? {} : { ...context.req.headers },
      withCredentials: true,
    }
  );
}
export function getCollections(context) {
  let fullUrl = studentPrefix + GET_COLLECTIONS_URL;
  return getApi(
    fullUrl,
    {},
    {
      headers: __isBrowser__ ? {} : { ...context.req.headers },
      withCredentials: true,
    }
  );
}

export function getAttendance(context) {
  let fullUrl = studentPrefix + GET_ATTENDANCE_URL;
  return getApi(
    fullUrl,
    {},
    {
      headers: __isBrowser__ ? {} : { ...context.req.headers },
      withCredentials: true,
    }
  );
}

export function cancelApplication(actId) {
  let fullUrl = `${studentPrefix}${CANCEL_APPLICATION_URL}?id=${actId}`;
  return postApi(
    fullUrl,
    {},
    {
      withCredentials: true,
    }
  );
}
