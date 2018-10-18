import React from 'react'
import { Button, Card } from 'antd'

import StyleWrapper from './style'


const PartnerCard = ({ partner, onClickSites, onClickBusinessProcesses }) => {
  const buttons = []
  buttons.push(<Button type="primary" block onClick={onClickSites}>Sites</Button>)
  if (partner.has_business_processes) {
    buttons.push(<Button type="primary" block onClick={onClickBusinessProcesses}>Business Processes</Button>)
  }
  while (buttons.length < 2) {
    buttons.splice(0, 0, null)
  }

  return (
    <StyleWrapper>
      <Card
        hoverable
        cover={<div className="image-wrapper">
          <div className="image" style={{ backgroundImage: `url(${partner.image})` }} />
        </div>}
        actions={buttons}
        bodyStyle={{ minHeight: 110 }}
      >
        <Card.Meta
          title={partner.name}
          description={partner.description}
        />
      </Card>
    </StyleWrapper>
  )
}

export default PartnerCard
