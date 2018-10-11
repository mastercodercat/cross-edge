import React, { Component } from 'react'
import { Spin } from 'antd'

import SpinnerDummyContent from 'components/SpinnerDummyContent'


export class Site extends Component {

  render() {
    const loading = false

    return (
      <Spin spinning={loading}>
        {
          loading ?
          <SpinnerDummyContent /> :
          children
        }
      </Spin>
    )
  }
}

export default Site
