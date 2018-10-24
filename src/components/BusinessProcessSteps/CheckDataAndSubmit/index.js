import React from 'react'


export const CheckDataAndSubmit = ({ values }) => {
  return (
    <div>
      <h2>Check Data and Submit</h2>
      <p>
        The following identifiers will be commissioned:
      </p>
      <p>
        {
          (values.barcodes || []).map(value => (
            <strong key={value}>{value}<br/></strong>
          ))
        }
      </p>
      <p>
        Check to ensure that the list of identifiers is correct. If not, click the "Previous" button to fix any issues.
      </p>
    </div>
  )
}

export default CheckDataAndSubmit
