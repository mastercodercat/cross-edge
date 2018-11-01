import React, { Component } from 'react'
import { mount } from 'enzyme'

import ScanOrEnterOneIDComponent from './component'


class TestComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { value: null }
  }

  onChange = (value) => this.setState({ value })

  render() {
    const { value } = this.state

    return <ScanOrEnterOneIDComponent
      input={{ value, onChange: this.onChange }}
      meta={{}}
    />
  }
}

it('should be able to input barcode identifier', () => {
  const wrapper = mount(<TestComponent />)

  const data = '1000001'

  const inputField = wrapper.find('input')
  inputField.prop('onChange')({ currentTarget: { value: data } })

  expect(wrapper.state('value')).toEqual(data)
})
