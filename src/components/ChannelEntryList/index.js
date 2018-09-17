import React from 'react'
import { Table, Spin } from 'antd'


const { Column } = Table

const ChannelEntryList = ({ loading, channelEntries, actions }) => (
  <Spin spinning={loading}>
    <Table
      dataSource={channelEntries}
      pagination={false}
      rowKey="id"
    >
      <Column
        title="Id"
        dataIndex="id"
        key="id"
      />
      <Column
        title="Name"
        dataIndex="name"
        key="name"
      />
      <Column
        title="UPC"
        dataIndex="upc"
        key="upc"
      />
      <Column
        title="GTIN"
        dataIndex="gtin"
        key="gtin"
      />
      <Column
        title="SKU"
        dataIndex="sku"
        key="sku"
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
