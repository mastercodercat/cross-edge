import React from 'react'
import { Button, Card } from 'antd'

import StyleWrapper from './style'


const SubscriberCard = ({ data, history }) => {
  const buttons = [
    <Button
      type="primary"
      block
      onClick={() => history.push(`/subscribers/${data.id}/sites`)}
    >
      Sites
    </Button>,
    <Button
      type="primary"
      block
      onClick={() => history.push(`/subscribers/${data.id}/partners`)}
    >
      Partners
    </Button>
  ]

  return (
    <StyleWrapper>
      <Card
        hoverable
        cover={<div className="image-wrapper">
          <div className="image" style={{ backgroundImage: `url(${data.image})` }} />
        </div>}
        actions={buttons}
        bodyStyle={{ minHeight: 110 }}
      >
        <Card.Meta
          title={data.name}
          description={data.description}
        />
      </Card>
    </StyleWrapper>
  )
}

export default SubscriberCard
