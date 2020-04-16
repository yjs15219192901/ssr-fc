import React from "react";
import "./index.less";
import { Card } from "antd";
import ActivityCard from "../../../component/activityCard";
import TopBar from "../../../component/topBar";
import { admin } from "../../../mockData";
import { prefix } from "../../../utils";
import { adminGetActList, getAdmin } from "../../../service/api/admin";
import { PlusOutlined } from "@ant-design/icons";

class AdminIndex extends React.Component {
  constructor(props) {
    super(props);
    this.jumpToActPost = this.jumpToActPost.bind(this);
  }

  jumpToActPost() {
    window.location.href = `${prefix}/admin/activityPost`;
  }

  render() {
    let { admin, actPublished } = this.props;
    // let { actPublished } = admin;
    return (
      <div className="admin-index-container">
        <TopBar forAdmin={true} userInfo={admin} />
        <div className="admin-index-body">
          <Card className="admin-index-card plus">
            <PlusOutlined
              style={{ fontSize: "64px", cursor: "pointer" }}
              onClick={this.jumpToActPost}
            />
          </Card>
          {actPublished.map((item) => {
            return (
              <ActivityCard
                forAdmin={true}
                card={item}
                className="admin-index-card"
              ></ActivityCard>
            );
          })}
        </div>
      </div>
    );
  }
}

AdminIndex.getInitialProps = async (ctx) => {
  // console.log("req cookies", ctx.req.cookies);
  let actListRes = await adminGetActList(ctx);
  let adminRes = await getAdmin(ctx);
  return { admin: adminRes.data.data, actPublished: actListRes.data.data };
};

export default AdminIndex;
