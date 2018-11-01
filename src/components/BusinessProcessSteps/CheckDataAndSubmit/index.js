import React from 'react'


export const CheckDataAndSubmit = ({ values, field, parentField }) => {
  return (
    <div>
      <h2>Check Data and Submit</h2>
      <p>
        The following identifiers will be commissioned:
      </p>
      <p>
        {
          (values[field] || []).map(value => (
            <strong key={value}>{value}<br/></strong>
          ))
        }
      </p>
      {
        parentField &&
        <div>
          <p>For this parent identifier:</p>
          <strong>{values[parentField]}</strong>
        </div>
      }
      <p>
        Check to ensure that the list of identifiers is correct. If not, click the "Previous" button to fix any issues.
      </p>
    </div>
  )
}

export default CheckDataAndSubmit
