import React from 'react'
import { Button, Card } from 'antd'

import StyleWrapper from './style'


const SiteCard = ({ site, isSubsite, onClickSubsites, onClickBusinessProcesses }) => {
  const buttons = []
  if (!isSubsite) {
    buttons.push(<Button type="primary" block onClick={onClickSubsites}>Subsites</Button>)
  }
  if (site.has_business_processes) {
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
          <div className="image" style={{ backgroundImage: `url(${site.image})` }} />
        </div>}
        actions={buttons}
        bodyStyle={{ minHeight: 110 }}
      >
        <Card.Meta
          title={site.name}
          description={site.description}
        />
      </Card>
    </StyleWrapper>
  )
}

export default SiteCard
