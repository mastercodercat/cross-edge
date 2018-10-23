import React, { Component } from 'react'
import { Input, Table } from 'antd'


const { Column } = Table

class ScanOrEnterIDsComponent extends Component {

  state = {
    enteringBarcode: '',
  }

  handleChangeBarcode = e =>
    this.setState({
      enteringBarcode: e.currentTarget.value
    })

  handleAddBarcode = (barcode) => {
    const { input: { onChange, value } } = this.props

    const newValue = value || []
    newValue.push(barcode)
    onChange(newValue)

    this.setState({
      enteringBarcode: ''
    })
  }

  render() {
    const { input: { value } } = this.props
    const { enteringBarcode } = this.state

    const tableData = (value || []).map(v => ({ barcode: v }))

    return (
      <div>
        <Input.Search
          value={enteringBarcode}
          onChange={this.handleChangeBarcode}
          placeholder="Focus here to scan or enter barcode identifier"
          enterButton="Add"
          onSearch={this.handleAddBarcode}
        />

        <div style={{ marginTop: 25 }}>
          <Table
            dataSource={tableData}
            rowKey="barcode"
            pagination={false}
            bordered
          >
            <Column
              title="Barcode"
              dataIndex="barcode"
              key="barcode"
            />
            <Column
              key="action"
              render={(text, record) => (
                <a
                  href=":;"
                  onClick={e => e}
                >
                  Delete
                </a>
              )}
            />
          </Table>
        </div>
      </div>
    )
  }
}

export default ScanOrEnterIDsComponent
