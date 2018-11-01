import React from 'react'

import Wizard from 'components/Wizard'
import ScanOrEnterIDs from 'components/BusinessProcessSteps/ScanOrEnterIDs'
import ScanOrEnterOneID from 'components/BusinessProcessSteps/ScanOrEnterOneID'
import CheckDataAndSubmit from 'components/BusinessProcessSteps/CheckDataAndSubmit'


const Aggregation = ({ onSubmit, submitting }) => (
  <Wizard onSubmit={onSubmit} submitting={submitting}>
    <Wizard.Page validate={ScanOrEnterIDs.validate.bind(this, "data")}>
      <ScanOrEnterIDs field="data" />
    </Wizard.Page>
    <Wizard.Page validate={ScanOrEnterOneID.validate.bind(this, "parent")}>
      <ScanOrEnterOneID field="parent" />
    </Wizard.Page>
    <Wizard.Page>
      <CheckDataAndSubmit field="data" parentField="parent" />
    </Wizard.Page>
  </Wizard>
)

export default Aggregation
