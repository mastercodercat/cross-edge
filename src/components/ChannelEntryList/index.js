import React from 'react'
import { Table, Spin } from 'antd'
import moment from 'moment'


const { Column } = Table

const ChannelEntryList = ({ loading, channelEntries, actions, pagination }) => (
  <Spin spinning={loading}>
    <Table
      dataSource={channelEntries}
      pagination={pagination}
      rowKey="serial_number"
    >
      <Column
        title="Product"
        dataIndex="product.name"
        key="product.name"
      />
      <Column
        title="Serial number"
        dataIndex="serial_number"
        key="serial_number"
      />
      <Column
        title="Ship date"
        key="ship_date"
        render={(text, record) => moment(record.ship_date).format('DD/MM/YYYY HH:mm:ss')}
      />
      {
        (actions && actions.length) &&
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
      }
    </Table>
  </Spin>
)

export default ChannelEntryList
