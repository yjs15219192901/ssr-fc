import React from "react";
import {
  Form,
  Select,
  Button,
  DatePicker,
  InputNumber,
  Input,
  Radio,
  message,
} from "antd";
import moment from "moment";
import TopBar from "../../../component/topBar";
import { SCORE_MAP, SCHOOL_LIST, prefix } from "../../../utils";
import { admin, activityData } from "../../../mockData";
import { addActivity, updateActivity } from "../../../service/api/admin";
import { getActDetail } from "../../../service/api/common";
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
import "./index.less";

class PostActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.actDetail ? props.actDetail.name : "",
      description: props.actDetail ? props.actDetail.description : "",
      place: props.actDetail ? props.actDetail.place : "",
      time: props.actDetail ? props.actDetail.time : null,
      quato: props.actDetail ? props.actDetail.quato : 0,
      score: props.actDetail
        ? props.actDetail.score
        : {
            moral: 0,
          },
      registrationMethod: props.actDetail
        ? props.actDetail.registrationMethod
        : "online",
      qualification: props.actDetail
        ? props.actDetail.qualification
        : [
            {
              major: "不限",
              grade: 0,
            },
          ],
      applyForm: props.actDetail ? props.actDetail.applyForm : [],
    };
    this.configuration = this.configuration.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    // showModal({ text: "hello world!" });
    let res = null;
    if (this.props.actDetail) {
      let { _id, publisher } = this.props.actDetail;
      res = await updateActivity(_id, {
        ...this.state,
        publisher,
      });
    } else {
      res = await addActivity({
        publisher: window.localStorage.getItem("publisher"),
        ...this.state,
      });
    }
    if (res.data.error === 0) {
      message.success("提交成功！");
      // window.location.href = `${prefix}/admin`;
    } else {
      console.log(res.data);
    }
  }

  configuration(item) {
    let { applyForm } = this.state;

    return (
      <>
        {item.inputType && (
          <>
            <Form.Item label="题目">
              <Input
                value={item.title}
                onInput={(e) => {
                  item.title = e.target.value;
                  console.log(applyForm);
                  this.setState({
                    applyForm,
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="是否必填">
              <Radio.Group
                value={item.required}
                onChange={(e) => {
                  item.required = e.target.value;
                  this.setState({
                    applyForm,
                  });
                }}
              >
                <Radio value={true}>必填</Radio>
                <Radio value={false}>非必填</Radio>
              </Radio.Group>
            </Form.Item>
          </>
        )}
        {item.inputType === "select" &&
          item.options &&
          Array.isArray(item.options) &&
          item.options.map((option, index) => {
            return (
              <React.Fragment key={index}>
                <Form.Item label={`选项${index + 1}`}>
                  <Input
                    style={{ width: "76%" }}
                    value={option.optionName}
                    onInput={(e) => {
                      item.options[index].optionName = e.target.value;
                      console.log(applyForm);
                      this.setState({
                        applyForm,
                      });
                    }}
                  ></Input>
                  <Button
                    type="danger"
                    onClick={() => {
                      item.options.splice(index, 1);
                      this.setState({
                        applyForm,
                      });
                    }}
                  >
                    删除
                  </Button>
                </Form.Item>
                {/* {index + 1 === item.options.length && (
                  
                )} */}
              </React.Fragment>
            );
          })}
        {item.inputType === "select" && (
          <>
            <Form.Item>
              <Button
                onClick={() => {
                  item.options.push({ optionName: "" });
                  console.log(applyForm);
                  this.setState({
                    applyForm,
                  });
                }}
              >
                新增选项
              </Button>
            </Form.Item>
            <Form.Item label="单选/多选">
              <Radio.Group
                onChange={(e) => {
                  item.multiple = e.target.value;
                  console.log(applyForm);
                  this.setState({
                    applyForm,
                  });
                }}
                value={item.multiple}
              >
                <Radio value={false}>单选</Radio>
                <Radio value={true}>多选</Radio>
              </Radio.Group>
            </Form.Item>
            {item.multiple && (
              <>
                <Form.Item label="最多选择几项">
                  <InputNumber
                    value={item.max}
                    onChange={(value) => {
                      item.max = value;
                      console.log(applyForm);
                      this.setState({
                        applyForm,
                      });
                    }}
                  ></InputNumber>
                </Form.Item>
                <Form.Item label="最少选择几项">
                  <InputNumber
                    value={item.min}
                    onChange={(value) => {
                      item.min = value;
                      console.log(applyForm);
                      this.setState({
                        applyForm,
                      });
                    }}
                  ></InputNumber>
                </Form.Item>
              </>
            )}
          </>
        )}
        <Form.Item>
          <Button
            type="danger"
            onClick={() => {
              let delIndex = this.state.applyForm.indexOf(item);
              this.state.applyForm.splice(delIndex, 1);
              this.setState({
                applyForm,
              });
            }}
          >
            删除配置
          </Button>
        </Form.Item>
      </>
    );
  }

  render() {
    let {
      name,
      description,
      place,
      time,
      quato,
      qualification,
      score,
      registrationMethod,
      applyForm,
    } = this.state;
    delete score._id;
    const { admin } = this.props;
    return (
      <div className="admin-activity-post-container">
        <TopBar userInfo={admin} forAdmin={true}></TopBar>
        <Form {...layout} className="admin-activity-post-form">
          <Form.Item label="活动名称">
            <Input
              value={name}
              onInput={(e) => {
                this.setState({
                  name: e.target.value,
                });
              }}
            />
          </Form.Item>

          <Form.Item label="活动简介">
            <Input.TextArea
              value={description}
              autoSize={{ minRows: 5 }}
              onInput={(e) => {
                this.setState({
                  description: e.target.value,
                });
              }}
            />
          </Form.Item>

          <Form.Item label="活动地点">
            <Input
              value={place}
              onInput={(e) => {
                this.setState({
                  place: e.target.value,
                });
              }}
            />
          </Form.Item>

          <Form.Item label="学分">
            {Object.entries(score).map(([k, v], index) => {
              // let newScore = {};
              return (
                <Input.Group compact key={k}>
                  <Form.Item>
                    <Select
                      value={k}
                      onChange={(value) => {
                        if (k !== value) {
                          delete score[k];
                          score[value] = v;
                          this.setState({
                            score,
                          });
                        }
                      }}
                    >
                      <Select.Option value="moral">德育分</Select.Option>
                      <Select.Option value="innovation">创新分</Select.Option>
                      <Select.Option value="humanity">人文分</Select.Option>
                      <Select.Option value="volunteer">志愿时</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: "请输入学分数" }]}
                  >
                    <InputNumber
                      placeholder="学分/志愿时数"
                      value={v}
                      onChange={(value) => {
                        score[k] = value;
                        this.setState({
                          score,
                        });
                      }}
                    />
                  </Form.Item>
                  {Object.keys(score).length === index + 1 ? (
                    <Form.Item>
                      <Button
                        onClick={() => {
                          let nextType = Object.keys(SCORE_MAP)[
                            (Object.keys(SCORE_MAP).indexOf(k) + 1) % 4
                          ];
                          if (nextType) {
                            score[nextType] = 0;
                            this.setState({
                              score: score,
                            });
                          }
                        }}
                      >
                        新增
                      </Button>
                    </Form.Item>
                  ) : (
                    <Form.Item>
                      <Button
                        type="danger"
                        onClick={() => {
                          delete score[k];
                          this.setState({
                            score: score,
                          });
                        }}
                      >
                        删除
                      </Button>
                    </Form.Item>
                  )}
                </Input.Group>
              );
            })}
          </Form.Item>

          <Form.Item label="活动开始日期">
            <DatePicker
              showTime
              value={time && moment(time)}
              onChange={(date, dateString) => {
                console.log("date", date);
                console.log("date string", dateString);
                this.setState({
                  time: date,
                });
              }}
            />
          </Form.Item>

          <Form.Item label="名额">
            <InputNumber
              value={quato}
              onChange={(value) => {
                this.setState({
                  quato: value,
                });
              }}
            />
            <label style={{ marginLeft: "5px" }}>若名额不限则填0</label>
          </Form.Item>

          <Form.Item
            label="面向群体"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            {qualification.map((i, index) => {
              return (
                <div className="admin-activity-post-form-block" key={index}>
                  <Form.Item label="学院">
                    <Select
                      style={{ width: "100%" }}
                      value={i.major}
                      onChange={(value) => {
                        i.major = value;
                        this.setState({
                          qualification,
                        });
                      }}
                    >
                      <Select.Option value="不限">不限</Select.Option>
                      {SCHOOL_LIST.map((school) => {
                        return (
                          <Select.Option key={school} value={school}>
                            {school}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="年级">
                    <Select
                      style={{ width: "100%" }}
                      value={i.grade}
                      onChange={(value) => {
                        i.grade = value;
                        this.setState({
                          qualification,
                        });
                      }}
                    >
                      <Select.Option value={0}>不限</Select.Option>
                      <Select.Option value={1}>大一</Select.Option>
                      <Select.Option value={2}>大二</Select.Option>
                      <Select.Option value={3}>大三</Select.Option>
                      <Select.Option value={4}>大四</Select.Option>
                      <Select.Option value={5}>研一</Select.Option>
                      <Select.Option value={6}>研二</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="danger"
                      onClick={() => {
                        let delIndex = qualification.indexOf(i);
                        qualification.splice(delIndex, 1);
                        this.setState({
                          qualification,
                        });
                      }}
                    >
                      删除
                    </Button>
                  </Form.Item>
                </div>
              );
            })}
            <Form.Item>
              <Button
                onClick={() => {
                  qualification.push({ major: "", grade: "" });
                  this.setState({
                    qualification,
                  });
                }}
              >
                新增
              </Button>
            </Form.Item>
          </Form.Item>

          <Form.Item label="报名方式">
            <Radio.Group
              value={registrationMethod}
              onChange={(e) => {
                this.setState({
                  registrationMethod: e.target.value,
                });
              }}
            >
              <Radio value="online">线上报名</Radio>
              <Radio value="offline">线下报名</Radio>
            </Radio.Group>
          </Form.Item>

          {registrationMethod === "online" && (
            <Form.Item label="报名配置">
              {applyForm.map((config, index) => {
                return (
                  <div className="admin-activity-post-form-block" key={index}>
                    <Form.Item label="题型选择">
                      <Select
                        value={config.inputType}
                        placeholder="请选择题型"
                        onChange={(value) => {
                          config.inputType = value;
                          if (value === "select");
                          config.options = [
                            { optionName: "" },
                            { optionName: "" },
                          ];
                          console.log(applyForm);
                          this.setState({
                            applyForm,
                          });
                        }}
                      >
                        <Select.Option value="select">选择题</Select.Option>
                        <Select.Option value="input">填空题</Select.Option>
                      </Select>
                    </Form.Item>
                    {this.configuration(config)}
                  </div>
                );
              })}
              <Button
                onClick={() => {
                  applyForm.push({
                    inputType: "",
                    title: "",
                    placeholder: "",
                    multiple: false,
                    required: true,
                    options: [],
                    max: 0,
                    min: 0,
                  });
                  this.setState({
                    applyForm,
                  });
                }}
              >
                新增配置
              </Button>
            </Form.Item>
          )}

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" onClick={this.handleSubmit}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

PostActivity.getInitialProps = async (ctx) => {
  const actId = __isBrowser__ ? ctx.match.params.id : ctx.req.params.id;
  if (actId) {
    // const actDetail = activityData.find((item) => item.name === actId);
    let { data } = await getActDetail(actId);
    return { admin, actDetail: data.data };
  } else {
    return { admin };
  }
};
export default PostActivity;
