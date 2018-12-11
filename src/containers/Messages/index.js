import React, { Component } from 'react'

import { PageTitle } from 'components/common'
import MessageBox from 'components/MessageBox'


export class Messages extends Component {

  render() {
    return <div>
      <PageTitle>
        <i className="fal fa-envelope" /> Messages
      </PageTitle>

      <MessageBox />
    </div>
  }
}

export default Messages
