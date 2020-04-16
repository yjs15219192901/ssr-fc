import React, { useState, useEffect } from "react";
// import style from './index.module.less';
import "./index.less";
import { cls, prefix } from "../../utils";
export default function TopBar(props) {
  let { userInfo, forAdmin } = props;
  return (
    <div className="topbar-container">
      <div
        className="topbar-title"
        onClick={() => {
          if (!forAdmin) {
            window.location.href = `${prefix}/`;
          } else {
            window.location.href = `${prefix}/admin`;
          }
        }}
      >
        学分管理系统
      </div>
      <div
        className="topbar-profile"
        onClick={() => {
          if (!forAdmin) {
            window.location.href = `${prefix}/profile`;
          }
        }}
      >
        {!forAdmin ? userInfo.name : userInfo.school}
      </div>
    </div>
  );
}
