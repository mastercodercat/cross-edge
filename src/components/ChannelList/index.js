import React from 'react'
import { Table, Spin } from 'antd'

import { sorter } from 'utils/list'


const { Column } = Table

const ChannelList = ({ loading, channels, rowClassName, onClickColumn, onClickEntries }) => (
  <Spin spinning={loading}>
    <Table
      dataSource={channels}
      rowClassName={rowClassName}
      rowKey="id"
      pagination={false}
    >
      <Column
        title="Name"
        dataIndex="name"
        key="name"
        sorter={sorter}
      />
      <Column
        title="GLN"
        dataIndex="gln"
        key="gln"
        sorter={sorter}
      />
      <Column
        title="Country"
        dataIndex="country"
        key="country"
        sorter={sorter}
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <span>
            <a className="mr" href={`/channels/${record.id}`} onClick={onClickColumn.bind(this, record)}>Details</a>
            <a href="/channels" onClick={onClickEntries.bind(this, record)}>Entries</a>
          </span>
        )}
      />
    </Table>
  </Spin>
)

export default ChannelList
