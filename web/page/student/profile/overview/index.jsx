import React, { useState, useEffect } from "react";
import { Descriptions, Table } from "antd";
import { SCORE_MAP, GRADE_MAP, getFormatTime } from "../../../../utils";
import "./index.less";

export default function Overview(props) {
  let { profile, activityAttendance } = props;
  console.log("activity attendance", activityAttendance);
  const column = [
    {
      title: "活动名称",
      dataIndex: "name",
      key: "name",
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
      render: (text, record) => {
        return <span>{text}</span>;
      },
    },
  ];

  const data = activityAttendance.map((item) => {
    return {
      ...item,
      time: item.time.toLocaleString(),
      score: Object.entries(item.score)
        .map(([k, v]) => {
          if (k === "volunteer") {
            return `${SCORE_MAP[k]}:${v}时`;
          }
          return `${SCORE_MAP[k]}:${v}分`;
        })
        .join("，"),
    };
  });
  return (
    <div className="student-profile-overview-container">
      <Descriptions title="信息概览" bordered column={4}>
        <Descriptions.Item label="姓名">{profile.name}</Descriptions.Item>
        <Descriptions.Item label="学号">{profile.ID}</Descriptions.Item>
        <Descriptions.Item label="专业">{profile.major}</Descriptions.Item>
        <Descriptions.Item label="年级班级">{`${GRADE_MAP[profile.grade]}${
          profile.class
        }班`}</Descriptions.Item>
        <Descriptions.Item label="德育分">
          {profile.score.moral}
        </Descriptions.Item>
        <Descriptions.Item label="创新分">
          {profile.score.innovation}
        </Descriptions.Item>
        <Descriptions.Item label="人文分">
          {profile.score.humanity}
        </Descriptions.Item>
        <Descriptions.Item label="志愿时">
          {profile.score.volunteer}
        </Descriptions.Item>
      </Descriptions>

      <div className="student-profile-overview-table-wrap">
        <div className="student-profile-overview-table-title">活动记录</div>
        <Table
          className="student-profile-overview-table"
          pagination={false}
          scroll={{ y: 300 }}
          columns={column}
          dataSource={data}
        ></Table>
      </div>
    </div>
  );
}

Overview.prefetch = async (ctx = {}) => {};
