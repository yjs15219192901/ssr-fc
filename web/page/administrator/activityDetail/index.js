import React from "react";
import "./index.less";
import TopBar from "../../../component/topBar";

import { Menu } from "antd";
import { admin, activityData } from "../../../mockData";
import { getActDetail } from "../../../service/api/common";
import { getAdmin } from "../../../service/api/admin";
import moment from "moment";
// import { SCORE_MAP, prefix } from "../../../utils";

import ActivityOverview from "./activityOverview";
import RecordScore from "./recordScore";
import ApplicationDetail from "./applicationDetail";

const TAB = [
  {
    key: "1",
    component: ActivityOverview,
    prefetch: ActivityOverview.prefetch,
  },
  {
    key: "2",
    component: ApplicationDetail,
    prefetch: ApplicationDetail.prefetch,
  },
  {
    key: "3",
    component: RecordScore,
    prefetch: RecordScore.prefetch,
  },
];
class activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Component: TAB[0],
      componentProps: props,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(e) {
    let component = TAB.find((i) => i.key === e.key);
    let componentProp = await component.prefetch(this.props);
    this.setState({
      Component: component,
      componentProps: Object.assign({}, ...this.props, componentProp),
    });
  }

  render() {
    let { admin } = this.props;
    let { Component, componentProps } = this.state;
    return (
      <div className="admin-activity-detail-container">
        <TopBar userInfo={admin} forAdmin={true} />
        <div className="admin-activity-detail-body">
          <Menu
            className="admin-activity-detail-sider"
            theme="dark"
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys="1"
          >
            <Menu.Item key="1">活动概览</Menu.Item>
            <Menu.Item key="2">报名详情</Menu.Item>
            <Menu.Item key="3">录入学分</Menu.Item>
            <Menu.Item key="4">删除</Menu.Item>
          </Menu>
          <div className="admin-activity-detail-content">
            <Component.component {...componentProps}></Component.component>
          </div>
        </div>
      </div>
    );
  }
}

activity.getInitialProps = async (ctx) => {
  const actId = __isBrowser__ ? ctx.match.params.id : ctx.req.params.id;
  // const actDetail = activityData.find((item) => item.name === actId);
  const res = await getActDetail(actId);
  const adminRes = await getAdmin(ctx);
  // console.log("time", moment(res.data.data.time));
  // console.log("front end", res.data);
  return { admin: adminRes.data.data, actDetail: res.data.data };
};

export default activity;
