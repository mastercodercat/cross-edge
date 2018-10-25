import React from 'react'
import { Button, Card } from 'antd'

import StyleWrapper from './style'


const BusinessProcessCard = ({ data, history }) => (
  <StyleWrapper>
    <Card
      hoverable
      cover={<div className="image-wrapper">
        <div className="image" style={{ backgroundImage: `url(${data.image})` }} />
      </div>}
      actions={[
        <Button
          type="primary"
          block
          onClick={() => history.push(`/business-processes/${data.name}`)}
        >
          Go
        </Button>
      ]}
      bodyStyle={{ minHeight: 110 }}
    >
      <Card.Meta
        title={data.name}
        description={<div className="descriptionWrapper">{data.description}</div>}
      />
    </Card>
  </StyleWrapper>
)

export default BusinessProcessCard
