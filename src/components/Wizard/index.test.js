import React, { Component } from 'react'
import { mount } from 'enzyme'
import { Field } from 'react-final-form'

import Wizard from './index'


class TestComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { values: {} }
  }

  onChange = (values) => this.setState({ values })

  render() {
    return <Wizard onSubmit={this.onChange}>
      <Wizard.Page>
        <Field name="field1" component="input" />
      </Wizard.Page>
      <Wizard.Page>
        <Field name="field2" component="input" />
      </Wizard.Page>
      <Wizard.Page>
        <Field name="textfield" render={({ input }) => (
          <textarea {...input} />
        )} />
      </Wizard.Page>
    </Wizard>
  }
}

it('Wizard should submit entered values in all steps correctly', () => {
  const testData = {
    field1: 'test value 1',
    field2: 'test value 1',
    textfield: 'this is text entered in textarea',
  }

  const wrapper = mount(<TestComponent />)

  wrapper.find('input').prop('onChange')(testData.field1)
  wrapper.find('form').simulate('submit')

  wrapper.find('input').prop('onChange')(testData.field2)
  wrapper.find('form').simulate('submit')

  wrapper.find('textarea').prop('onChange')(testData.textfield)
  wrapper.find('form').simulate('submit')

  expect(wrapper.state('values')).toEqual(testData)
})
