import React, { Component } from 'react'
import { mount } from 'enzyme'

import ScanOrEnterIDsComponent from './component'


class TestComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { value: null }
  }

  onChange = (value) => this.setState({ value })

  render() {
    const { value } = this.state

    return <ScanOrEnterIDsComponent
      input={{ value, onChange: this.onChange }}
      meta={{}}
    />
  }
}

it('should be able to add barcodes by entering and hitting `Enter` key', () => {
  const wrapper = mount(<TestComponent />)

  const barcodes = ['1000001', '1000002', '1000003']
  const inputField = wrapper.find('input')
  barcodes.forEach(barcode => {
    inputField.prop('onChange')({ currentTarget: { value: barcode } })
    inputField.simulate('keydown', { keyCode: 13 })
  })

  expect(wrapper.state('value')).toEqual(barcodes)
})
