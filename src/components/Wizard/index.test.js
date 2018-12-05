import React, { Component } from 'react'
import { mount } from 'enzyme'
import { Field } from 'react-final-form'

import CheckboxField from 'components/BusinessProcessSteps/CheckboxField'
import Wizard from './index'


const InputField = ({ input, meta }) => <div>
  {
    (meta.touched && meta.error) && <p>{meta.touched && meta.error}</p>
  }
  <input {...input} />
</div>

const InputStep = ({ field }) => <Field name={field} component={InputField} />
InputStep.validate = (field, values) => {
  if (!values || !values[field] || !values[field].length) {
    return { [field]: 'Required value' }
  }
  return {}
}

const TextareaStep = ({ field }) => <Field name={field} render={({ input }) => <textarea {...input} />} />

const wizardStepsForTest = [
  [
    { stepComponent: InputStep, field: 'field1', },
    { stepComponent: InputStep, field: 'field1_2', }
  ],
  [
    { stepComponent: InputStep, field: 'field2', }
  ],
  [
    { stepComponent: TextareaStep, field: 'textfield', }
  ],
]

class TestComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { values: {} }
  }

  onChange = (values) => this.setState({ values })

  render() {
    const { steps, lastStepOptions } = this.props
    return <Wizard
      onSubmit={this.onChange}
      steps={steps}
      lastStepOptions={lastStepOptions}
    />
  }
}

it('Wizard should submit entered values in all steps correctly', () => {
  const testData = {
    field1: 'test value 1',
    field1_2: 'test value 1-2',
    field2: 'test value 1',
    textfield: 'this is text entered in textarea',
  }

  const wrapper = mount(<TestComponent steps={wizardStepsForTest} />)

  wrapper.find('input').at(0).prop('onChange')(testData.field1)
  wrapper.find('input').at(1).prop('onChange')(testData.field1_2)
  wrapper.find('form').simulate('submit')

  wrapper.find('input').prop('onChange')(testData.field2)
  wrapper.find('form').simulate('submit')

  wrapper.find('textarea').prop('onChange')(testData.textfield)
  wrapper.find('form').simulate('submit')

  expect(wrapper.state('values')).toEqual(testData)
})

it('Wizard should validate input data in each step', () => {
  const testData = {
    field1: 'test value 1',
    field1_2: 'test value 1-2',
  }

  const wrapper = mount(<TestComponent steps={wizardStepsForTest} />)

  wrapper.find('input').at(0).prop('onChange')(testData.field1)
  wrapper.find('input').at(1).prop('onChange')(testData.field1_2)
  wrapper.find('form').simulate('submit')

  wrapper.find('input').prop('onChange')('')
  wrapper.find('form').simulate('submit')

  // Validation error message should be visible
  expect(wrapper.text()).toEqual(expect.stringContaining('Required value'))

  // Wizard should be still at step 2, so textarea should not be visible
  expect(wrapper.find('textarea').length).toEqual(0)
})

it('Wizard should include last step option value in submitted data', () => {
  const testData = {
    field1: 'anyvalue',
    last_step_option_field: true,
  }

  const wrapper = mount(<TestComponent
    steps={[
      [
        { stepComponent: InputStep, field: 'field1' },
      ]
    ]}
    lastStepOptions={[
      {
        component: CheckboxField,
        field: 'last_step_option_field',
        props: {
          label: 'Last step option label'
        }
      }
    ]}
  />)

  wrapper.find('input').at(0).prop('onChange')(testData.field1)
  wrapper.find('input').at(1).simulate('change', {
    target: { checked: testData.last_step_option_field }
  })
  wrapper.find('form').simulate('submit')

  expect(wrapper.state('values')).toEqual(testData)
})
