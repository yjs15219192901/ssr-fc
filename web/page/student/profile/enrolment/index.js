import React, { useState } from "react";
import { Table, Button, message } from "antd";
// import {activityAttendance} from '../../../../mockData';
import { SCORE_MAP, prefix, getFormatTime } from "../../../../utils";
import {
  getApplication,
  cancelApplication,
} from "../../../../service/api/student";

export default function Enrolment(props) {
  const { activityApplication } = props;
  let [activityList, setActivityList] = useState(activityApplication);
  const column = [
    {
      title: "活动名称",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return <a href={`${prefix}/activity/${record._id}`}>{text}</a>;
      },
    },
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
      render: (text, record) => {
        return <span>{getFormatTime(record.time)}</span>;
      },
    },
    {
      title: "地点",
      dataIndex: "place",
      key: "place",
    },
    {
      title: "学分",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <Button
            type="danger"
            onClick={() => {
              cancel(record._id);
            }}
          >
            取消报名
          </Button>
        );
      },
    },
  ];

  async function cancel(actId) {
    let res = await cancelApplication(actId);
    if (res.data.error == 0) {
      message.success("取消成功");
      let temp = activityList.filter((act) => act._id !== actId);
      setActivityList(temp);
    }
  }

  const data = activityList.map((item) => {
    delete item.score._id;
    return {
      ...item,
      time: item.time.toLocaleString(),
      score: Object.entries(item.score)
        .map(([k, v]) => {
          if (k === "volunteer") {
            return v !== 0
              ? `${SCORE_MAP[k]}:${v}时`
              : `${SCORE_MAP[k]}:依据实际服务时长`;
          }
          return `${SCORE_MAP[k]}:${v}分`;
        })
        .join("，"),
    };
  });
  return (
    <div>
      <Table dataSource={data} columns={column} pagination={false}></Table>
    </div>
  );
}

Enrolment.prefetch = async (ctx = {}) => {
  let res = __isBrowser__ ? await getApplication() : await getApplication(ctx);
  console.log("res", res.data);
  return { activityApplication: res.data.data };
};
