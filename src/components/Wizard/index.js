import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { Button } from 'antd'

import StyleWrapper from './style'


export class Wizard extends React.Component {

  static propTypes = {
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
  }

  static Page = ({ values, children }) => (
    <div className="wizardStep">
      {
        React.Children.map(children, child => React.cloneElement(child, {
          values,
        }))
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
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }))

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }))

  validate = values => {
    const { children } = this.props
    const { page } = this.state

    const activePage = React.Children.toArray(children)[page]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = values => {
    const { children, onSubmit } = this.props
    const { page } = this.state

    const isLastPage = (page === React.Children.count(children) - 1)
    if (isLastPage) {
      return onSubmit(values)
    } else {
      this.next(values)
    }
  }

  render() {
    const { children } = this.props
    const { page, values } = this.state

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        values,
      })
    )
    const activePage = React.Children.toArray(childrenWithProps)[page]
    const isLastPage = (page === React.Children.count(children) - 1)

    return (
      <StyleWrapper>
        <Form
          initialValues={values}
          validate={this.validate}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              {activePage}
              <div className="wizardButtons">
                {
                  page > 0 &&
                  <Button type="button" onClick={this.previous}>Previous</Button>
                }
                {
                  !isLastPage &&
                  <Button type="primary" htmlType="submit">Next</Button>
                }
                {
                  isLastPage &&
                  <Button type="primary" htmlType="submit" disabled={submitting}>
                    Submit
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
