import React, { Component } from 'react'
import { Field } from 'react-final-form'

import ScanOrEnterIDsComponent from './component'


export class ScanOrEnterIDs extends Component {

  static validate = values => {
    if (!values || !values.barcodes || !values.barcodes.length) {
      return { barcodes: 'At least one barcode should be entered' }
    }
    return {}
  }

  render() {
    return (
      <div>
        <Field
          name="barcodes"
          component={ScanOrEnterIDsComponent}
        />
      </div>
    )
  }
}

export default ScanOrEnterIDs
