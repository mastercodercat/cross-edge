import React from 'react'
import { Row, Col, Button } from 'antd'
import { pluralize, dasherize, titleize } from 'inflection'

import StyleWrapper from './style'


export const Card = ({ image, title, description, buttons }) => (
  <StyleWrapper>
    {
      image &&
      <div className="imageWrapper">
        <div className="image" style={{ backgroundImage: `url(${image})` }} />
      </div>
    }

    <div className="content">
      <h3 className="title"><strong>{title}</strong></h3>
      <div className="descriptionWrapper">
        {description}
      </div>
    </div>

    {
      buttons.length > 0 &&
      <div className="buttonsWrapper">
        <Row gutter={15} type="flex" justify="end">
          {
            buttons.map((button, index) => (
              <Col key={index} xs={24} sm={24} md={24} lg={24} xl={12} className="buttonCol">
                {button}
              </Col>
            ))
          }
        </Row>
      </div>
    }
  </StyleWrapper>
)

const BPMCard = ({ data, history }) => {
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
      const subtypeField = subtype === 'subsites' ? 'sub_sites' : subtype
      if (data[`has_${subtypeField}`]) {
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

  return <Card
    image={data.image}
    title={data.name}
    description={data.description}
    buttons={buttons}
  />
}

export default BPMCard
