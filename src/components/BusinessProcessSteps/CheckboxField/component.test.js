import React, { Component } from 'react'
import { mount } from 'enzyme'
import { Checkbox } from 'antd'

import CheckboxFieldComponent from './component'


const checkboxLabel = 'Checkbox label string'

class TestComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { value: null }
  }

  onChange = (value) => this.setState({ value })

  render() {
    const { value } = this.state

    return <CheckboxFieldComponent
      input={{ value, onChange: this.onChange }}
      meta={{}}
      label={checkboxLabel}
    />
  }
}

it('should have correct label', () => {
  const wrapper = mount(<TestComponent />)

  const checkboxLabelElement = wrapper.find('label')

  expect(checkboxLabelElement.text()).toEqual(checkboxLabel)
})

it('should be able to tick', () => {
  const wrapper = mount(<TestComponent />)

  const checkboxField = wrapper.find(Checkbox)
  checkboxField.prop('onChange')(true)

  expect(wrapper.state('value')).toEqual(true)
})

it('should be able to untick', () => {
  const wrapper = mount(<TestComponent />)

  const checkboxField = wrapper.find(Checkbox)
  checkboxField.prop('onChange')(false)

  expect(wrapper.state('value')).toEqual(false)
})
