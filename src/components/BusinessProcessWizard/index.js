import React from 'react'

import Commissioning from './Commissioning'
import Aggregation from './Aggregation'


const NAME_TO_COMPONENT_MAP = {
  'Commissioning': Commissioning,
  'Aggregation': Aggregation,
}

const BusinessProcessWizard = ({ businessProcess, onSubmit, submitting }) => {
  const BusinessProcessWizardComponent = NAME_TO_COMPONENT_MAP[businessProcess.name]

  if (BusinessProcessWizardComponent) {
    return (
      <BusinessProcessWizardComponent
        businessProcess={businessProcess}
        onSubmit={onSubmit}
        submitting={submitting}
      />
    )
  } else {
    return (
      <div>Invalid business process name</div>
    )
  }
}

export default BusinessProcessWizard
