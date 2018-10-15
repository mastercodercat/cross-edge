import React from 'react'
import { Button } from 'antd'

import StyleWrapper from './style'


const BusinessProcessCard = ({ businessProcess, onClickGo }) => (
  <StyleWrapper>
    <div className="business-process-image-wrapper">
      <div className="business-process-image" style={{ backgroundImage: `url(${businessProcess.image})` }} />
    </div>
    <div className="content">
      <h3 className="title"><center>{businessProcess.name}</center></h3>
      <div className="description">
        {businessProcess.description}
      </div>
      <div className="buttons">
        <div className="button-wrapper">
        </div>
        <div className="button-wrapper">
          <Button type="primary" block onClick={onClickGo}>Go</Button>
        </div>
      </div>
    </div>
  </StyleWrapper>
)

export default BusinessProcessCard
