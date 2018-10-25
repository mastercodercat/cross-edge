import React from 'react'


export default (type) => Component => props => {
  return <Component
    type={type}
    {...props}
  />
}
