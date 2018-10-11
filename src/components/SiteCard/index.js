import React from 'react'
import { Button } from 'antd'

import StyleWrapper from './style'


const SiteCard = ({ site }) => (
  <StyleWrapper>
    <div class="site-image-wrapper">
      <div class="site-image" style={{ backgroundImage: `url(${site.image})` }} />
    </div>
    <div class="content">
      <h3 class="title"><center>{site.name}</center></h3>
      <div class="description">
        {site.description}
      </div>
      <div class="buttons">
        <div class="button-wrapper">
          <Button type="primary" block>Subsites</Button>
        </div>
        <div class="button-wrapper">
          <Button type="primary" block>Business Processes</Button>
        </div>
      </div>
    </div>
  </StyleWrapper>
)

export default SiteCard
