import React from "react";
import { Menu } from "antd";
import "./index.less";

import { profile, activityAttendance } from "../../../mockData";
import { getAttendance } from "../../../service/api/student";
import TopBar from "../../../component/topBar";
import WithProfile from "../../../component/withProfile";
import Overview from "./overview";
import Enrolment from "./enrolment";
import Collections from "./collections";

const TAB = [
  {
    key: "1",
    component: Overview,
    prefetch: Overview.prefetch,
  },
  {
    key: "2",
    component: Enrolment,
    prefetch: Enrolment.prefetch,
  },
  {
    key: "3",
    component: Collections,
    prefetch: Collections.prefetch,
  },
];

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showComponent: TAB[0],
      componentProps: props,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(e) {
    console.log(e);
    let component = TAB.find((i) => i.key === e.key);
    console.log(component);
    let componentProp = await component.prefetch(this.props);
    this.setState({
      showComponent: component,
      componentProps: Object.assign({}, ...this.props, componentProp),
    });
  }

  render() {
    let { profile } = this.props;
    let { showComponent, componentProps } = this.state;
    return (
      <div className="student-profile-container">
        <TopBar userInfo={profile}></TopBar>
        <div className="student-profile-body">
          <Menu
            className="student-profile-sider"
            theme="dark"
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys="1"
          >
            <Menu.Item key="1">信息概览</Menu.Item>
            <Menu.Item key="2">已报名活动</Menu.Item>
            <Menu.Item key="3">已收藏活动</Menu.Item>
          </Menu>
          <div className="student-profile-content">
            {
              <showComponent.component
                {...componentProps}
              ></showComponent.component>
            }
          </div>
        </div>
      </div>
    );
  }
}

Profile.getInitialProps = async (ctx) => {
  let res = await getAttendance(ctx);
  console.log("res", res.data.data);
  return { activityAttendance: res.data.data };
};

export default WithProfile(Profile);
