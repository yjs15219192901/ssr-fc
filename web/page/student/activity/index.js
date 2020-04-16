import React from "react";
import "./index.less";
import TopBar from "../../../component/topBar";
import WithProfile from "../../../component/withProfile";
import {
  Descriptions,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
// import { profile, activityData } from "../../../mockData";
import { SCORE_MAP, getFormatTime } from "../../../utils";
import { getActDetail, getActApplicantList } from "../../../service/api/common";
import { applyForAct } from "../../../service/api/student";

let gotInitialProps = false;
class activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      applyMsg: {},
      applicationMsg: [],
    };
    this.handleApply = this.handleApply.bind(this);
    this.genForm = this.genForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getBtnText = this.getBtnText.bind(this);
    console.log("props", props);
  }

  componentDidMount() {
    let { applicantList, profile } = this.props;
    let applicant = applicantList.find(
      (applicant) => applicant.studentId == profile.ID
    );
    if (applicant) {
      this.setState({
        applicationMsg: applicant.applyFormValue,
      });
    }
  }

  async handleApply() {
    let { actDetail, applicantList } = this.props;
    if (applicantList.length < actDetail.quato || actDetail.quato === 0) {
      if (actDetail.applyForm.length > 0) {
        this.setState({
          modalVisible: true,
        });
      } else {
        let applyData = { actId: actDetail._id, applyFormValue: [] };
        let res = await applyForAct(applyData);
        if (res.data.error == 0) {
          message.success("报名成功");
          window.location.reload();
        }
      }
      // return null;
    } else {
      return null;
    }
  }

  getBtnText() {
    let { actDetail, applicantList, profile } = this.props;
    let applicant = applicantList.find(
      (applicant) => applicant.studentId == profile.ID
    );
    if (applicant) {
      return "已报名";
    }
    if (actDetail.quato === 0) {
      return "报名";
    } else if (applicantList.length < actDetail.quato) {
      return `已报名${applicantList.length}位`;
    } else {
      return "名额已满";
    }
  }

  genForm() {
    let { actDetail } = this.props;
    let { applyMsg, applicationMsg } = this.state;
    console.log(applyMsg);
    return (
      <Form onFinish={this.handleSubmit}>
        {actDetail.applyForm &&
          actDetail.applyForm.map((formItem, index) => {
            return (
              <Form.Item
                name={formItem.title}
                label={formItem.title}
                key={index}
                rules={[
                  { required: true, message: "请填写该项" },
                  { type: formItem.multiple ? "array" : "string" },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (
                        formItem.max &&
                        value &&
                        value.length > formItem.max
                      ) {
                        return Promise.reject(`最多选择${formItem.max}项`);
                      } else if (
                        formItem.min &&
                        value &&
                        value.length < formItem.min
                      ) {
                        return Promise.reject(`最少选择${formItem.min}项`);
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                {formItem.inputType === "input" ? (
                  <Input
                    defaultValue={
                      applicationMsg.find((i) => i.title == formItem.title) &&
                      applicationMsg.find((i) => i.title == formItem.title)
                        .value[0]
                    }
                    // value={applyMsg[formItem.title][0]}
                    onInput={(e) => {
                      applyMsg[formItem.title] = e.target.value;
                      this.setState({ applyMsg });
                    }}
                  />
                ) : formItem.inputType === "select" ? (
                  <Select
                    defaultValue={
                      applicationMsg.find((i) => i.title == formItem.title) &&
                      applicationMsg.find((i) => i.title == formItem.title)
                        .value
                    }
                    // value={
                    //   formItem.multiple
                    //     ? applyMsg[formItem.title]
                    //     : applyMsg[formItem.title][0]
                    // }
                    onChange={(value) => {
                      applyMsg[formItem.title] = value;
                      this.setState({ applyMsg });
                    }}
                    mode={formItem.multiple ? "multiple" : null}
                  >
                    {formItem.options.map((option) => (
                      <Select.Option
                        key={option.optionName}
                        value={option.optionName}
                      >
                        {option.optionName}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  ""
                )}
              </Form.Item>
            );
          })}
        <Form.Item>
          <Button htmlType="submit" style={{ float: "right" }}>
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }

  async handleSubmit(values) {
    let { actDetail } = this.props;
    let applyData = { actId: actDetail._id };
    applyData.applyFormValue = Object.entries(values).map(([k, v]) => {
      return { title: k, value: v };
    });
    console.log("apply data", applyData);
    let res = await applyForAct(applyData);
    if (res.data.error == 0) {
      message.success("报名成功");
      window.location.reload();
    } else {
      message.warn("报名失败");
    }
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    let { profile, actDetail, applicantList } = this.props;
    let { modalVisible } = this.state;
    return gotInitialProps || (window && window.__USE_SSR__) ? (
      <div className="student-activity-container">
        <TopBar userInfo={profile} />
        <div className="student-activity-body">
          <Descriptions title={actDetail.name} bordered>
            <Descriptions.Item label="时间">
              {getFormatTime(actDetail.time)}
            </Descriptions.Item>
            <Descriptions.Item label="地点">
              {actDetail.place}
            </Descriptions.Item>
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
              {actDetail.registrationMethod === "online"
                ? "线上报名"
                : "线下报名"}
            </Descriptions.Item>
            <Descriptions.Item label="详情">
              {actDetail.description.split("\n").map((paragraph, index) => {
                return <p key={index}>{paragraph}</p>;
              })}
            </Descriptions.Item>
          </Descriptions>

          {actDetail.registrationMethod === "online" && (
            <Button
              onClick={this.handleApply}
              type="primary"
              className="student-activity-btn"
              disabled={
                applicantList.length >= actDetail.quato && actDetail.quato !== 0
              }
            >
              {this.getBtnText()}
            </Button>
          )}

          {actDetail.applyForm.length > 0 && (
            <Modal
              title="报名信息"
              visible={modalVisible}
              onCancel={() => {
                this.setState({
                  modalVisible: false,
                });
              }}
              footer={null}
            >
              {this.genForm()}
            </Modal>
          )}
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}

activity.getInitialProps = async (ctx) => {
  gotInitialProps = true;
  // console.log("here", __isBrowser__);
  const actId = __isBrowser__ ? ctx.match.params.id : ctx.req.params.id;
  // const actDetail = activityData.find((item) => item.name === actId);
  const actDetailRes = await getActDetail(actId);
  const actApplicantRes = await getActApplicantList(actId);
  return {
    // profile,
    actDetail: actDetailRes.data.data,
    applicantList: actApplicantRes.data.data,
  };
};

export default WithProfile(activity);
