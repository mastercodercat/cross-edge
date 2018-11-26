import React, { Component } from 'react'
import { Icon } from 'antd'

import { PageTitle } from 'components/common'


class Dashboard extends Component {

  render() {
    return (
      <div>
        <PageTitle>
          <Icon type="dashboard" /> Dashboard
        </PageTitle>

        Dashboard content here
      </div>
    )
  }
}

export default Dashboard
