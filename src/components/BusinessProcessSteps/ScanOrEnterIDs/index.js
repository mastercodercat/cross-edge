import React, { Component } from 'react'
import { Field } from 'react-final-form'

import ScanOrEnterIDsComponent from './component'


export class ScanOrEnterIDs extends Component {

  render() {
    return (
      <div>
        <Field
          name="testValue"
          component={ScanOrEnterIDsComponent}
          type="text"
          placeholder=""
        />
      </div>
    )
  }
}

export default ScanOrEnterIDs
