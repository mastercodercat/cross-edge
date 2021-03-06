import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import ScanOrEnterIDsComponent from './component'


export class ScanOrEnterIDs extends Component {

  static propTypes = {
    field: PropTypes.string.isRequired,
  }

  static validate = (field, values) => {
    if (!values || !values[field] || !values[field].length) {
      return { [field]: 'At least one barcode should be entered' }
    }
    return {}
  }

  render() {
    const { field } = this.props

    return (
      <div>
        <Field
          name={field}
          component={ScanOrEnterIDsComponent}
        />
      </div>
    )
  }
}

export default ScanOrEnterIDs
