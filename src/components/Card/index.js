import React from 'react'
import { Row, Col, Button } from 'antd'
import { pluralize, dasherize, titleize } from 'inflection'

import StyleWrapper from './style'


const Card = ({ data, history }) => {
  const urlPrefix = pluralize(data.mdm_type)
  const subtypes = ['partners', 'sites', 'subsites', 'business_processes']
  const buttons = []
  if (data.mdm_type === 'business_process') {
    buttons.push(
      <Button
        type="primary"
        block
        onClick={() => history.push(`/business-processes/${data.name}`)}
      >
        Go
      </Button>
    )
  } else {
    subtypes.forEach(subtype => {
      if (data[`has_${subtype}`]) {
        buttons.push(
          <Button
            type="primary"
            block
            onClick={() => history.push(`/${urlPrefix}/${data.id}/${dasherize(subtype)}`)}
          >
            {titleize(subtype)}
          </Button>
        )
      }
    })
  }

  return <StyleWrapper>
    <div className="imageWrapper">
      <div className="image" style={{ backgroundImage: `url(${data.image})` }} />
    </div>

    <div className="content">
      <h3 className="title"><strong>{data.name}</strong></h3>
      {data.description}
    </div>

    {
      buttons.length > 0 &&
      <div className="buttonsWrapper">
        <Row gutter={15}>
          {
            buttons.map((button, index) => (
              <Col key={index} sm={24} md={24} lg={24} xl={12} className="buttonCol">
                {button}
              </Col>
            ))
          }
        </Row>
      </div>
    }
  </StyleWrapper>
}

export default Card
