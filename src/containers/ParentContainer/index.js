import React, { Component } from 'react'
import { compose } from 'redux'
import { Spin } from 'antd'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withRouter } from 'react-router'

import connectByType from 'hoc/connectByType'
import SpinnerDummyContent from 'components/SpinnerDummyContent'
import { isLoading, hasFailed } from 'utils/state-helpers'

export class ParentContainer extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    detail: ImmutablePropTypes.record.isRequired,
    loadDetail: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { match, loadDetail } = this.props
    loadDetail({
      id: match.params.parentId
    })
  }

  render() {
    const { type, detail, children } = this.props
    const loading = isLoading(detail.state)

    if (hasFailed(detail.state)) {
      return <div>Failed to load {type} information.</div>
    }

    let childrenWithProps = null
    if (!loading) {
      childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, {
          parentType: type,
          parent: detail
        })
      )
    }

    return (
      <Spin spinning={loading}>
        {
          loading ?
          <SpinnerDummyContent /> :
          childrenWithProps
        }
      </Spin>
    )
  }
}

export default compose(
  withRouter,
  connectByType({
    actions: ['loadDetail'],
    selects: ['detail']
  }),
)(ParentContainer)
