import React from "react";
import serialize from "serialize-javascript";
import { Link } from "react-router-dom";
import config from "../../config/config.ssr";
import "@/assets/common.less";
import "./index.less";

const commonNode = (props) => {
  // 为了同时兼容ssr/csr请保留此判断，如果你的layout没有内容请使用 props.children ? <div>{ props.children }</div> : ''
  return props.children ? <div>{props.children}</div> : "";
};

const Layout = (props) => {
  if (__isBrowser__) {
    return commonNode(props);
  } else {
    const { serverData } = props.layoutData;
    const { injectCss, injectScript } = props.layoutData.app.config;
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="keywords"
            itemProp="keywords"
            content="serverless, 函数计算, 无服务, 服务端渲染, React, Egg, Serverless+SSR, ReactSSR, SSR"
          />
          <meta property="og:title" content="Serverless 服务端渲染" />
          <meta property="og:description" content="Serverless SSR 应用示例" />
          <title>Serverless 服务端渲染</title>
          {injectCss &&
            injectCss.map((item) => (
              <link rel="stylesheet" href={item} key={item} />
            ))}
        </head>
        <body>
          <div id="app">{commonNode(props)}</div>
          {serverData && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.__USE_SSR__=true; window.__INITIAL_DATA__ =${serialize(
                  serverData
                )}`,
              }}
            />
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: injectScript && injectScript.join(""),
            }}
          />
        </body>
      </html>
    );
  }
};

export default Layout;
