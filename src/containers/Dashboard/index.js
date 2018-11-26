import React, { Component } from 'react'

import { PageTitle } from 'components/common'


class Dashboard extends Component {

  render() {
    return (
      <div>
        <PageTitle>
          <i className="fal fa-tachometer-alt" /> Dashboard
        </PageTitle>

        Dashboard content here
      </div>
    )
  }
}

export default Dashboard
