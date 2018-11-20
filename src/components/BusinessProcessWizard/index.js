import React from 'react'

import Wizard from 'components/Wizard'
import ScanOrEnterIDs from 'components/BusinessProcessSteps/ScanOrEnterIDs'
import ScanOrEnterOneID from 'components/BusinessProcessSteps/ScanOrEnterOneID'
import CheckDataAndSubmit from 'components/BusinessProcessSteps/CheckDataAndSubmit'


const TYPE_TO_COMPONENT_MAP = {
  'scan-single': ScanOrEnterOneID,
  'scan-multiple': ScanOrEnterIDs,
  'display': CheckDataAndSubmit,
}

const BusinessProcessWizard = ({ businessProcess, onSubmit, submitting }) => {
  const steps = businessProcess.steps.map(stepData => {
    return stepData.map(fieldData => {
      if (!TYPE_TO_COMPONENT_MAP[fieldData.type]) {
        return null
      }
      const { type, name, label, ...otherFields } = fieldData
      return {
        stepComponent: TYPE_TO_COMPONENT_MAP[type],
        field: name,
        label: label,
        ...otherFields,
      }
    }).filter(field => !!field)
  }).filter(step => step.length > 0)

  return <Wizard
    onSubmit={onSubmit}
    submitting={submitting}
    steps={steps}
  />
}

export default BusinessProcessWizard
