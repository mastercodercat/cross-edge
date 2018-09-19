import React from 'react'
import { Table, Spin } from 'antd'


const { Column } = Table

const ChannelEntryList = ({ loading, channelEntries, actions, pagination }) => (
  <Spin spinning={loading}>
    <Table
      dataSource={channelEntries}
      pagination={pagination}
      rowKey="serial_number"
    >
      <Column
        title="Product ID"
        dataIndex="product"
        key="product"
      />
      <Column
        title="Serial number"
        dataIndex="serial_number"
        key="serial_number"
      />
      <Column
        title="Ship date"
        dataIndex="ship_date"
        key="ship_date"
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => actions.map((action, index) => (
          <a
            key={index}
            href=":;"
            onClick={action.handler.bind(this, record)}
          >
            {action.text}
          </a>
        ))}
      />
    </Table>
  </Spin>
)

export default ChannelEntryList
