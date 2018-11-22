import React, { Component } from 'react'
import { mount } from 'enzyme'
import { Select } from 'antd'

import SelectComponent from './component'


class TestComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { value: null }
  }

  onChange = (value) => this.setState({ value })

  render() {
    const { value } = this.state

    return <SelectComponent
      input={{ value, onChange: this.onChange }}
      meta={{}}
      data={['Item 1', 'Item 2', 'Item 3']}
    />
  }
}

it('should be able to select one item', () => {
  const wrapper = mount(<TestComponent />)

  const value = 'Item 1'
  const selectField = wrapper.find(Select)
  selectField.prop('onChange')(value)

  expect(wrapper.state('value')).toEqual(value)
})
