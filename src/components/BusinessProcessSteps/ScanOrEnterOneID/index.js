import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import ScanOrEnterOneIDComponent from './component'


export class ScanOrEnterOneID extends Component {

  static propTypes = {
    field: PropTypes.string.isRequired,
  }

  static validate = (field, values) => {
    if (!values || !values[field]) {
      return { [field]: 'This field is required' }
    }

    return {}
  }

  render() {
    const { field } = this.props

    return (
      <div>
        <Field
          name={field}
          component={ScanOrEnterOneIDComponent}
        />
      </div>
    )
  }
}

export default ScanOrEnterOneID
