import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Checkbox } from 'antd'


class CheckboxFieldComponent extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
  }

  render() {
    const { input: { onChange, value }, meta, label } = this.props

    const validationError = meta.touched && meta.error

    return (
      <div>
        {
          validationError &&
          <div className="alert-wrapper">
            <Alert message={validationError} type="error" closable />
          </div>
        }

        <Checkbox checked={!!value} onChange={onChange}>
          {label}
        </Checkbox>
      </div>
    )
  }
}

export default CheckboxFieldComponent
