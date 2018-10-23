import React from 'react'


export const CheckDataAndSubmit = ({ values }) => {
  return (
    <pre>{JSON.stringify(values, 0, 2)}</pre>
  )
}

export default CheckDataAndSubmit
