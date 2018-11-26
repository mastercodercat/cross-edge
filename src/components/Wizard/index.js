import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { Button } from 'antd'

import { Label } from 'components/common'
import StyleWrapper from './style'


export class Wizard extends React.Component {

  static propTypes = {
    steps: PropTypes.array.isRequired,
    initialValues: PropTypes.object,
    submitting: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
  }

  static Page = ({ values, step, steps }) => (
    <div className="wizardStep">
      {
        step.map((fieldData, index) => {
          const { stepComponent: StepComponent, control, field, label, ...otherProps } = fieldData
          return <div className="wizardStepField" key={field || `field_${index}`}>
            {
              control !== 'verify-submit' &&
              <Label>{label}</Label>
            }

            <StepComponent
              values={values}
              field={field}
              steps={steps}
              label={label}
              {...otherProps}
            />
          </div>
        })
      }
    </div>
  )

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues || {}
    }
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.steps.length - 1),
      values
    }))

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }))

  validate = values => {
    const { steps } = this.props
    const { page } = this.state

    let validationResult = {}

    const activeStep = steps[page]
    if (activeStep) {
      activeStep.forEach(field => {
        if (field.stepComponent.validate) {
          validationResult = {
            ...validationResult,
            ...(field.stepComponent.validate(field.field, values))
          }
        }
      })
    }
    return validationResult
  }

  handleSubmit = values => {
    const { steps, onSubmit } = this.props
    const { page } = this.state

    const isLastPage = (page === steps.length - 1)
    if (isLastPage) {
      return onSubmit(values)
    } else {
      this.next(values)
    }
  }

  render() {
    const { steps, submitting } = this.props
    const { page, values } = this.state

    const activeStep = steps[page]
    const isLastPage = (page === steps.length - 1)

    return (
      <StyleWrapper>
        <Form
          initialValues={values}
          validate={this.validate}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              {
                activeStep ?
                <Wizard.Page values={values} step={activeStep} steps={steps} />
                :
                <p>Page not found.</p>
              }

              <div className="wizardButtons">
                {
                  page > 0 &&
                  <Button type="button" onClick={this.previous} disabled={submitting}>
                    Previous
                  </Button>
                }
                {
                  !isLastPage &&
                  <Button type="primary" htmlType="submit" disabled={submitting}>
                    Next
                  </Button>
                }
                {
                  isLastPage &&
                  <Button type="primary" htmlType="submit" disabled={submitting}>
                    {
                      submitting ? 'Submitting...' : 'Submit'
                    }
                  </Button>
                }
              </div>
            </form>
          )}
        </Form>
      </StyleWrapper>
    )
  }
}

export default Wizard
