import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Alert } from 'antd'


class ScanOrEnterOneIDComponent extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  }

  handleChangeField = e => {
    const { input: { onChange } } = this.props
    
    onChange(e.currentTarget.value)
  }

  render() {
    const { input: { value }, meta } = this.props

    const validationError = meta.touched && meta.error

    return (
      <div>
        {
          validationError &&
          <div className="alert-wrapper">
            <Alert message={validationError} type="error" closable />
          </div>
        }

        <p>Enter parent identifier:</p>
        <Input
          value={value}
          onChange={this.handleChangeField}
          placeholder="Put focus here to scan or enter barcode identifier"
          autoFocus
        />
      </div>
    )
  }
}

export default ScanOrEnterOneIDComponent
