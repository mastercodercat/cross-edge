import React from 'react'

import { LabelInline } from 'components/common'


const removeActionFromLabel = str => str.replace(/^select/i, '')
  .replace(/^scan or enter/i, '')

export const CheckDataAndSubmit = ({ values, steps, label }) => {
  return (
    <div>
      <h2>Check Data and Submit</h2>

      {
        label &&
        <p>{label}</p>
      }

      {
        steps.map(step => step.filter(fieldData => !!values[fieldData.field]).map(fieldData => (
          <div key={fieldData.field}>
            <LabelInline>{removeActionFromLabel(fieldData.label)}:</LabelInline>

            {
              values[fieldData.field].constructor === Array ?
              <p>
                {
                  (values[fieldData.field] || []).map(value => (
                    <strong key={value}>{value}<br/></strong>
                  ))
                }
              </p>
              :
              <p><strong>{values[fieldData.field]}</strong></p>
            }
          </div>
        )))
      }
    </div>
  )
}

export default CheckDataAndSubmit
