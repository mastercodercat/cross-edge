import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import CheckboxFieldComponent from './component'


export class CheckboxField extends Component {

  static propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }

  render() {
    const { field, label } = this.props

    return (
      <Field
        name={field}
        type="checkbox"
        component={CheckboxFieldComponent}
        label={label}
      />
    )
  }
}

export default CheckboxField
