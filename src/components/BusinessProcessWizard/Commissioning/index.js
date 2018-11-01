import React from 'react'

import Wizard from 'components/Wizard'
import ScanOrEnterIDs from 'components/BusinessProcessSteps/ScanOrEnterIDs'
import CheckDataAndSubmit from 'components/BusinessProcessSteps/CheckDataAndSubmit'


const Commissioning = ({ onSubmit, submitting }) => (
  <Wizard onSubmit={onSubmit} submitting={submitting}>
    <Wizard.Page validate={ScanOrEnterIDs.validate.bind(this, "data")}>
      <ScanOrEnterIDs field="data" />
    </Wizard.Page>
    <Wizard.Page>
      <CheckDataAndSubmit field="data" />
    </Wizard.Page>
  </Wizard>
)

export default Commissioning
