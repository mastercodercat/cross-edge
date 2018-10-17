import React from 'react'
import { Button } from 'antd'

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
      <div className="site-image-wrapper">
        <div className="site-image" style={{ backgroundImage: `url(${site.image})` }} />
      </div>
      <div className="content">
        <h3 className="title"><center>{site.name}</center></h3>
        <div className="description">
          {site.description}
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

export default SiteCard
