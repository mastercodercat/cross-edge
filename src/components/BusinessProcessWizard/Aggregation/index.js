import React from 'react'

import Wizard from 'components/Wizard'
import ScanOrEnterIDs from 'components/BusinessProcessSteps/ScanOrEnterIDs'
import ScanOrEnterOneID from 'components/BusinessProcessSteps/ScanOrEnterOneID'
import CheckDataAndSubmit from 'components/BusinessProcessSteps/CheckDataAndSubmit'


const Aggregation = ({ onSubmit, submitting }) => (
  <Wizard
    onSubmit={onSubmit}
    submitting={submitting}
    steps={[
      {
        stepComponent: ScanOrEnterIDs,
        field: 'data',
      },
      {
        stepComponent: ScanOrEnterOneID,
        field: 'parent',
      },
      {
        stepComponent: CheckDataAndSubmit,
        field: 'data',
        parentField: 'parent',
      },
    ]}
  />
)

export default Aggregation
