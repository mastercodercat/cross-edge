import React from 'react'

import Wizard from 'components/Wizard'
import ScanOrEnterIDs from 'components/BusinessProcessSteps/ScanOrEnterIDs'
import ScanOrEnterOneID from 'components/BusinessProcessSteps/ScanOrEnterOneID'
import CheckDataAndSubmit from 'components/BusinessProcessSteps/CheckDataAndSubmit'
import SelectField from 'components/BusinessProcessSteps/SelectField'


const TYPE_TO_COMPONENT_MAP = {
  'scan-single': ScanOrEnterOneID,
  'scan-multiple': ScanOrEnterIDs,
  'verify-submit': CheckDataAndSubmit,
  'select': SelectField,
}

const BusinessProcessWizard = ({ businessProcess, onSubmit, submitting }) => {
  const steps = businessProcess.markup.steps.map(stepData => {
    return stepData.map(fieldData => {
      if (!TYPE_TO_COMPONENT_MAP[fieldData.control]) {
        return null
      }
      const { control, name, label, ...otherFields } = fieldData
      return {
        stepComponent: TYPE_TO_COMPONENT_MAP[control],
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
