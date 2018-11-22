import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import SelectComponent from './component'


export class SelectField extends Component {

  static propTypes = {
    field: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
  }

  static validate = (field, values) => {
    if (!values || !values[field]) {
      return { [field]: 'This field is required' }
    }

    return {}
  }

  render() {
    const { field, data } = this.props

    return (
      <Field name={field} component={SelectComponent} data={data} />
    )
  }
}

export default SelectField
