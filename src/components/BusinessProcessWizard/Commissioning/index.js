import React from 'react'

import Wizard from 'components/Wizard'
import ScanOrEnterIDs from 'components/BusinessProcessSteps/ScanOrEnterIDs'
import CheckDataAndSubmit from 'components/BusinessProcessSteps/CheckDataAndSubmit'


const Commissioning = ({ onSubmit, submitting }) => (
  <Wizard
    onSubmit={onSubmit}
    submitting={submitting}
    steps={[
      {
        stepComponent: ScanOrEnterIDs,
        field: 'data,'
      },
      {
        stepComponent: CheckDataAndSubmit,
        field: 'data,'
      },
    ]}
  />
)

export default Commissioning
