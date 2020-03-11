import React from 'react'
import { Link } from 'react-router-dom'
import config from '../../../config/config.ssr'
import './index.less'

function Page (props) {
  return (
    <div className='normal'>
      <div className='welcome' />
      <ul className='list'>
        {
          props.news && props.news.map(item => (
            <li key={item.id}>
              <div>文章标题: {item.title}</div>
              <div className='toDetail'><Link to={`${config.prefix}/news/${item.id}`}>点击查看详情</Link></div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
  return __isBrowser__ ? (await window.fetch('/2016-08-15/proxy/ssr/page/api/getIndexData')).json() : require('../../../api');
}
export default Page
