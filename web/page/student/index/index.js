import React from "react";
import TopBar from "../../../component/topBar";
import ActivityCard from "../../../component/activityCard";
import WithProfile from "../../../component/withProfile";
import "./index.less";
import { Select, Input, Button, Empty, message } from "antd";
// import { activityData, profile } from "../../../mockData";
import {
  getActList,
  collectAct,
  cancelCollectAct,
} from "../../../service/api/student";

class index extends React.Component {
  constructor(props) {
    console.log("student index props", props);
    super(props);
    this.state = {
      scoreFilter: "all",
      keyWord: "",
      card: props.card || [],
      filteredCard: null,
      collections: props.profile ? props.profile.collections : [],
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCollect = this.handleCollect.bind(this);
    this.handleCancelCollection = this.handleCancelCollection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.card.length !== this.state.card) {
      this.setState({
        card: nextProps.card,
      });
    }
  }

  handleSelect(value) {
    this.setState({
      scoreFilter: value,
    });
  }

  handleInput(e) {
    let value = e.target.value;
    this.setState({
      keyWord: value,
    });
  }

  handleSearch() {
    let { card } = this.props;
    let { scoreFilter, keyWord } = this.state;
    let filtered = card.filter((item) => {
      if (scoreFilter !== "all") {
        return (
          item.name.indexOf(keyWord) > -1 &&
          Object.keys(item.score).includes(scoreFilter)
        );
      } else {
        return item.name.indexOf(keyWord) > -1;
      }
    });
    this.setState({
      card: filtered,
    });
  }

  async handleCollect(card) {
    // let { profile } = this.props;
    let { collections } = this.state;
    let res = await collectAct(card._id);
    console.log(res.data);
    if (res.data.error == 0) {
      collections.push(card._id);
      this.setState({ collections });
      message.success("收藏成功！");
    }
  }

  async handleCancelCollection(card) {
    let { collections } = this.state;
    let res = await cancelCollectAct(card._id);
    if (res.data.error == 0) {
      let newCollectionList = collections.filter((id) => id !== card._id);
      this.setState({ collections: newCollectionList });
    }
  }

  render() {
    let { scoreFilter, card, collections } = this.state;
    let { profile } = this.props;
    return profile ? (
      <div>
        <TopBar userInfo={profile} />
        <div className="student-index-tool">
          <div className="student-index-filter">
            学分类型：
            <Select defaultValue={scoreFilter} onChange={this.handleSelect}>
              <Select.Option value="moral">德育分</Select.Option>
              <Select.Option value="humanity">人文分</Select.Option>
              <Select.Option value="innovation">创新分</Select.Option>
              <Select.Option value="volunteer">志愿时</Select.Option>
              <Select.Option value="all">不限</Select.Option>
            </Select>
          </div>
          <div className="student-index-search">
            关键字搜索：
            <Input
              onChange={this.handleInput}
              className="student-index-input"
            ></Input>
          </div>
          <div>
            <Button onClick={this.handleSearch}>搜索</Button>
          </div>
        </div>
        <div className="student-index-body">
          {card.length > 0 ? (
            card.map((item, index) => {
              return (
                <ActivityCard
                  className="student-index-card"
                  key={item._id}
                  card={item}
                  collected={Boolean(collections.find((i) => i === item._id))}
                  handleCollect={this.handleCollect}
                  handleCancelCollection={this.handleCancelCollection}
                ></ActivityCard>
              );
            })
          ) : (
            <Empty description="暂无数据" className="student-index-empty" />
          )}
        </div>
      </div>
    ) : (
      ""
    );
  }
}

index.getInitialProps = async function (ctx) {
  let actListRes = await getActList(ctx);
  // let profileRes = await getProfileRes()
  console.log("res", actListRes.data);
  return { card: actListRes.data.data };
};

export default WithProfile(index);
