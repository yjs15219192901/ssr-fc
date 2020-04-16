import React from "react";
import "./index.less";
import { Table } from "antd";
import { actApplication } from "../../../../mockData";
import { getActApplicantList } from "../../../../service/api/common";
const { Column } = Table;
function ApplicationDetail(props) {
  let { actDetail, actApplication } = props;
  let { applyForm } = actDetail;
  return (
    <div>
      <Table dataSource={actApplication}>
        <Column title="姓名" key="name" dataIndex="name"></Column>
        <Column title="学号" key="studentId" dataIndex="studentId"></Column>
        <Column title="学院" key="school" dataIndex="school"></Column>
        {applyForm.map((item) => (
          <Column
            title={item.title}
            key={item.title}
            dataIndex={item.title}
          ></Column>
        ))}
      </Table>
    </div>
  );
}

function preDealData(tableData) {
  return tableData.map((data) => {
    let newObj = {};
    Object.entries(data).forEach(([k, v]) => {
      if (k !== "applyFormValue") {
        newObj[k] = v;
      } else {
        v.forEach((obj) => {
          if (Array.isArray(obj.value)) {
            newObj[obj.title] = obj.value.join(",");
          } else {
            newObj[obj.title] = obj.value;
          }
        });
      }
    });
    return newObj;
  });
}

ApplicationDetail.prefetch = async (ctx) => {
  const actId = __isBrowser__ ? ctx.match.params.id : ctx.req.params.id;
  const actApplicantRes = await getActApplicantList(actId);
  // console.log("act application", actApplicantRes.data.data);
  let clean = preDealData(actApplicantRes.data.data);
  console.log("clean", clean);
  return { actApplication: clean };
};

export default ApplicationDetail;
