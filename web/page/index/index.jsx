import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import config from '../../../config/config.ssr';
import { message, Button, Input, Form } from 'antd';
// import 'antd/dist/antd.css';
// import message from 'antd/es/message'; // 加载 JS
// import 'antd/es/message/style/css'
import './index.less';
const {Item} = Form;
function Page(props) {
  
  useEffect(() => {
    message.success('This is a success message');
  }, []);
  function jumpToDetail(id) {
    window.location.href = `${config.prefix}/news/${id}`
  }
  return (
    <div className='normal'>
      <div className='welcome' />
      <ul className='list'>
        {
          props.news && props.news.map(item => (
            <li key={item.id}>
              <div>文章标题: {item.title}</div>
              <Button
              // className='toDetail'
              onClick={() => {
                jumpToDetail(item.id);
              }}>点击查看详情</Button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
  return __isBrowser__ ? (await window.fetch('/2016-08-15/proxy/ssr/page/api/getIndexData')).json() : require('../../../app/api');
}
export default Page
