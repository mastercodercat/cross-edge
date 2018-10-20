import React from 'react'
import { Button, Card } from 'antd'

import StyleWrapper from './style'


const PartnerCard = ({ data, history }) => {
  const buttons = []
  buttons.push(
    <Button
      type="primary"
      block
      onClick={() => history.push(`/partners/${data.id}/sites`)}
    >
      Sites
    </Button>
  )
  if (data.has_business_processes) {
    buttons.push(
      <Button
        type="primary"
        block
        onClick={`/partners/${data.id}/business-processes`}
      >
        Business Processes
      </Button>
    )
  }
  while (buttons.length < 2) {
    buttons.splice(0, 0, null)
  }

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

export default PartnerCard
