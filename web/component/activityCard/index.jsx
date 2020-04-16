import React, { useState, useEffect } from "react";
import { Card, Tag } from "antd";
import HeartIcon from "../heartIcon";
import { HeartTwoTone } from "@ant-design/icons";
import { SCORE_COLOR_MAP, SCORE_MAP, prefix } from "../../utils";
import "./index.less";

export default function ActivityCard(props) {
  let {
    card,
    collected,
    forAdmin,
    handleCollect,
    handleCancelCollection,
    className,
  } = props;
  let extraMsg = (
    <Tag
      color={
        SCORE_COLOR_MAP[
          Object.keys(card.score)[Object.keys(card.score).length - 1]
        ]
      }
    >
      {SCORE_MAP[Object.keys(card.score)[Object.keys(card.score).length - 1]]}
    </Tag>
  );
  let title = (
    <span
      className="student-index-card-title"
      onClick={() => {
        if (!forAdmin) {
          window.location.href = `${prefix}/activity/${card._id}`;
        } else {
          window.location.href = `${prefix}/admin/activityDetail/${card._id}`;
        }
      }}
    >
      {!forAdmin && collected ? (
        <HeartIcon
          style={{
            color: "#eb2f96",
            fontSize: "24px",
            marginRight: "3px",
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleCancelCollection(card);
          }}
        ></HeartIcon>
      ) : !forAdmin && !collected ? (
        <HeartTwoTone
          twoToneColor="#eb2f96"
          style={{ fontSize: "22px", marginRight: "5px" }}
          onClick={(e) => {
            e.stopPropagation();
            handleCollect(card);
          }}
        ></HeartTwoTone>
      ) : (
        ""
      )}
      {card.name}
    </span>
  );
  return (
    <Card
      key={card._id || card.ID}
      title={title}
      className={className}
      extra={extraMsg}
    >
      {/*  */}
      <p>
        {card.description.length > 60
          ? `${card.description.slice(0, 60)}...`
          : card.description}
      </p>
    </Card>
  );
}
