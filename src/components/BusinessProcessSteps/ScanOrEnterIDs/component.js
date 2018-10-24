import React, { Component } from 'react'
import { Input, Table, Alert } from 'antd'

import StyleWrapper from './componentStyle'


const { Column } = Table

class ScanOrEnterIDsComponent extends Component {

  state = {
    enteringBarcode: '',
    error: null,
  }

  handleChangeBarcode = e =>
    this.setState({
      enteringBarcode: e.currentTarget.value
    })

  handleAddBarcode = (barcode) => {
    const { input: { onChange, value } } = this.props

    if (value.indexOf(barcode) >= 0) {
      this.setState({
        enteringBarcode: '',
        error: 'duplicate',
      })
    } else {
      const newValue = value || []
      newValue.push(barcode)
      onChange(newValue)

      this.setState({
        enteringBarcode: '',
        error: null,
      })
    }
  }

  handleDeleteBarcode = (barcode, ev) => {
    ev.preventDefault()

    const { input: { onChange, value } } = this.props

    const index = value.findIndex(elm => elm === barcode)
    if (index === -1) {
      return
    }

    const newValue = (value || []).slice()
    newValue.splice(index, 1)
    onChange(newValue)
  }

  handleKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault()
    }
  }

  render() {
    const { input: { value }, meta } = this.props
    const { enteringBarcode, error } = this.state

    const validationError = meta.touched && meta.error
    const tableData = (value || []).map(v => ({ barcode: v }))

    return (
      <StyleWrapper>
        {
          validationError &&
          <div className="alertWrapper">
            <Alert message={validationError} type="error" closable />
          </div>
        }

        {
          !validationError && error === 'duplicate' &&
          <div className="alertWrapper">
            <Alert message="Duplicate identifier" type="error" closable />
          </div>
        }

        <Input.Search
          value={enteringBarcode}
          onChange={this.handleChangeBarcode}
          placeholder="Put focus here to scan or enter barcode identifier"
          enterButton="Add"
          onSearch={this.handleAddBarcode}
          onKeyPress={this.handleKeyPress}
          autoFocus
        />

        <div style={{ marginTop: 25 }}>
          <Table
            dataSource={tableData}
            rowKey="barcode"
            pagination={false}
            bordered
            size="small"
          >
            <Column
              title="Barcode"
              dataIndex="barcode"
              key="barcode"
            />
            <Column
              key="action"
              render={(text, record) => (
                <a href="" onClick={this.handleDeleteBarcode.bind(this, record.barcode)}>
                  Delete
                </a>
              )}
            />
          </Table>
        </div>
      </StyleWrapper>
    )
  }
}

export default ScanOrEnterIDsComponent
