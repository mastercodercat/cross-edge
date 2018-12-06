import React from 'react'

import Wizard from 'components/Wizard'
import ScanOrEnterIDs from 'components/BusinessProcessSteps/ScanOrEnterIDs'
import ScanOrEnterOneID from 'components/BusinessProcessSteps/ScanOrEnterOneID'
import CheckDataAndSubmit from 'components/BusinessProcessSteps/CheckDataAndSubmit'
import SelectField from 'components/BusinessProcessSteps/SelectField'
import CheckboxField from 'components/BusinessProcessSteps/CheckboxField'


const TYPE_TO_COMPONENT_MAP = {
  'scan-single': ScanOrEnterOneID,
  'scan-multiple': ScanOrEnterIDs,
  'verify-submit': CheckDataAndSubmit,
  'select': SelectField,
}

const BusinessProcessWizard = ({ businessProcess, afterActionField, afterActionLabel, onSubmit, submitting }) => {
  const steps = businessProcess.markup.steps.map(stepData => {
    return stepData.map(fieldData => {
      if (!TYPE_TO_COMPONENT_MAP[fieldData.control]) {
        return null
      }
      const { control, field, label, ...otherFields } = fieldData
      return {
        stepComponent: TYPE_TO_COMPONENT_MAP[control],
        control,
        field,
        label: label,
        ...otherFields,
      }
    }).filter(field => !!field)
  }).filter(step => step.length > 0)

  const lastStepOptions = [
    {
      component: CheckboxField,
      field: afterActionField,
      props: {
        label: afterActionLabel
      }
    }
  ]

  return <Wizard
    onSubmit={onSubmit}
    submitting={submitting}
    steps={steps}
    lastStepOptions={lastStepOptions}
  />
}

export default BusinessProcessWizard
