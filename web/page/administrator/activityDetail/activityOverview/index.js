import React from "react";
import "./index.less";
import { activityData } from "../../../../mockData";
import moment from "moment";
import { Descriptions, Button } from "antd";
import { SCORE_MAP, prefix, getFormatTime } from "../../../../utils";

export default function ActivityOverview(props) {
  let { actDetail } = props;

  function handleEdit() {
    window.location.href = `${prefix}/admin/activityPost/${actDetail._id}`;
  }

  return (
    <React.Fragment>
      <Descriptions title={actDetail.name} bordered>
        <Descriptions.Item label="时间">
          {getFormatTime(actDetail.time)}
        </Descriptions.Item>
        <Descriptions.Item label="地点">{actDetail.place}</Descriptions.Item>
        <Descriptions.Item label="学分类型">
          {
            SCORE_MAP[
              Object.keys(actDetail.score)[
                Object.keys(actDetail.score).length - 1
              ]
            ]
          }
        </Descriptions.Item>
        <Descriptions.Item label="名额">
          {actDetail.quato === 0 ? "不限" : actDetail.quato}
        </Descriptions.Item>
        <Descriptions.Item label="报名方式" span={2}>
          {actDetail.registrationMethod === "online" ? "线上报名" : "线下报名"}
        </Descriptions.Item>
        <Descriptions.Item label="详情">
          {actDetail.description.split("\n").map((paragraph, index) => {
            return <p key={index}>{paragraph}</p>;
          })}
        </Descriptions.Item>
      </Descriptions>
      <Button
        onClick={handleEdit}
        type="primary"
        className="admin-activity-overview-btn"
      >
        编辑
      </Button>
    </React.Fragment>
  );
}

ActivityOverview.prefetch = (ctx) => {
  // const actId = __isBrowser__ ? ctx.match.params.id : ctx.req.params.id;
  // const actDetail = activityData.find((item) => item.name === actId);
  // return { actDetail };
};
