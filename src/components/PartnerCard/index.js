import React from 'react'
import { Button } from 'antd'

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
      <div className="partner-image-wrapper">
        <div className="partner-image" style={{ backgroundImage: `url(${partner.image})` }} />
      </div>
      <div className="content">
        <h3 className="title"><center>{partner.name}</center></h3>
        <div className="description">
          {partner.description}
        </div>
        <div className="buttons">
          {
            buttons.map((button, index) => (
              <div key={index} className="button-wrapper">{button}</div>
            ))
          }
        </div>
      </div>
    </StyleWrapper>
  )
}

export default PartnerCard
