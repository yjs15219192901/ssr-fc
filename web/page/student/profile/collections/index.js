import React, { useState, useEffect } from "react";
import { Empty } from "antd";
import ActivityCard from "../../../../component/activityCard";
import {
  getCollections,
  cancelCollectAct,
} from "../../../../service/api/student";
import "./index.less";

export default function Collections(props) {
  let { collections } = props;
  let [card, setCard] = useState(collections);
  async function cancelCollection(cancelCard) {
    let { _id } = cancelCard;
    let res = await cancelCollectAct(_id);
    if (res.data.error == 0) {
      let newCardList = card.filter((item) => item._id !== _id);
      setCard(newCardList);
    }
  }
  return (
    <div className="student-profile-collections-container">
      {card.length > 0 ? (
        card.map((item, index) => {
          return (
            <ActivityCard
              className="student-profile-collections-card"
              key={index}
              card={item}
              collected={true}
              handleCancelCollection={cancelCollection}
            ></ActivityCard>
          );
        })
      ) : (
        <Empty description="暂无数据" className="student-index-empty" />
      )}
    </div>
  );
}

Collections.prefetch = async (ctx = {}) => {
  let res = await getCollections(ctx);
  console.log("collections", res.data.data);
  return { collections: res.data.data };
};
