import { postApi, getApi } from "../../index";
const commonPrefix = "/api/common";

const GET_ACT_DETAIL_URL = "/act_detail";
const GET_ACT_APPLICANT_URL = "/act_applicant_list";

export function getActDetail(id) {
  let fullUrl = commonPrefix + GET_ACT_DETAIL_URL;
  return getApi(fullUrl, { id });
}

export function getActApplicantList(id) {
  let fullUrl = commonPrefix + GET_ACT_APPLICANT_URL;
  return getApi(fullUrl, { id });
}
