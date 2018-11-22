import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Alert, Select } from 'antd'


const Option = Select.Option

class SelectComponent extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
  }

  render() {
    const { input: { onChange, value }, meta, data } = this.props

    const validationError = meta.touched && meta.error

    return (
      <div>
        {
          validationError &&
          <div className="alert-wrapper">
            <Alert message={validationError} type="error" closable />
          </div>
        }

        <Select
          value={value}
          onChange={onChange}
          placeholder="Put focus here to scan or enter barcode identifier"
        >
          {
            data.map(option => <Option key={option} value={option}>
              {option}
            </Option>)
          }
        </Select>
      </div>
    )
  }
}

export default SelectComponent
