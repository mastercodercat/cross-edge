import React from 'react'
import { Button } from 'antd'

import StyleWrapper from './style'


const SiteCard = ({ site, isSubsite, onClickSubsites, onClickBusinessProcesses }) => (
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
        <div className="button-wrapper">
          {
            !isSubsite &&
            <Button type="primary" block onClick={onClickSubsites}>Subsites</Button>
          }
        </div>
        <div className="button-wrapper">
          {
            site.has_business_processes &&
            <Button type="primary" block onClick={onClickBusinessProcesses}>Business Processes</Button>
          }
        </div>
      </div>
    </div>
  </StyleWrapper>
)

export default SiteCard
