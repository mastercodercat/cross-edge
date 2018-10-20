import React from 'react'
import { Button } from 'antd'

import StyleWrapper from './style'


const BusinessProcessCard = ({ data, history }) => (
  <StyleWrapper>
    <div className="business-process-image-wrapper">
      <div className="business-process-image" style={{ backgroundImage: `url(${data.image})` }} />
    </div>
    <div className="content">
      <h3 className="title"><center>{data.name}</center></h3>
      <div className="description">
        {data.description}
      </div>
      <div className="buttons">
        <div className="button-wrapper">
        </div>
        <div className="button-wrapper">
          <Button
            type="primary"
            block
            onClick={() => history.push(`/business-processes/${data.name}`)}
          >
            Go
          </Button>
        </div>
      </div>
    </div>
  </StyleWrapper>
)

export default BusinessProcessCard
