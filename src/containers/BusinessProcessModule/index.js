import React, { Component } from 'react'
import { Icon, Spin } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import {
  loadSites,
  setSitesPage,
  setSitesPageSize,
  selectSites,
} from 'store/modules/sites'
import { isLoading } from 'utils/state-helpers'


export class BusinessProcessModule extends Component {

  static propTypes = {
    sites: ImmutablePropTypes.record.isRequired,
    loadSites: PropTypes.func.isRequired,
    setSitesPage: PropTypes.func.isRequired,
    setSitesPageSize: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadSites()
  }

  render() {
    const { sites } = this.props
    const loading = isLoading(sites.state)

    return (
      <div>
        <h1>
          <Icon type="profile" /> Business Process Module
        </h1>

        <Spin spinning={loading}>
          {
            loading ?
            <SpinnerDummyContent />
            :
            <div>Content here</div>
          }
        </Spin>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  sites: selectSites,
})

const actions = {
  loadSites,
  setSitesPage,
  setSitesPageSize,
}

export default compose(
  connect(selector, actions)
)(BusinessProcessModule)
