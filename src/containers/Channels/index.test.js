import React from 'react'
import ReactDOM from 'react-dom'
import Channels from './Channels'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Channels />, div)
  ReactDOM.unmountComponentAtNode(div)
})
