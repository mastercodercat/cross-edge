import React, { Component } from 'react'
import { compose } from 'redux'
import { Row, Col, Spin } from 'antd'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withRouter } from 'react-router'
import { pluralize, titleize } from 'inflection'

import { PageTitle } from 'components/common'
import SpinnerDummyContent from 'components/SpinnerDummyContent'
import Card from 'components/Card'
import connectByType from 'hoc/connectByType'
import { isLoading, hasFailed } from 'utils/state-helpers'
import { ICON_PREFIXES_BY_MDM_TYPES, ICONS_BY_MDM_TYPES } from 'config/base'


export class ChildList extends Component {

  static propTypes = {
    parentType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    parent: ImmutablePropTypes.record.isRequired,
    list: ImmutablePropTypes.record.isRequired,
    loadList: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { parentType, match, loadList } = this.props

    loadList({
      parentId: match.params.parentId,
      parentType,
    })
  }

  render() {
    const { type, history, list, parent } = this.props
    let error = false

    const spinning = isLoading(list.state) || error
    let typeTitle = type.replace(/[A-Z]/g, c => ' ' + c)
    typeTitle = pluralize(titleize(typeTitle))

    return (
      <div>
        <PageTitle>
          <i className={`${ICON_PREFIXES_BY_MDM_TYPES[type]} fa-${ICONS_BY_MDM_TYPES[type]}`} /> {typeTitle} for {parent.data.name}
        </PageTitle>

        <Spin spinning={spinning}>
          {
            spinning ?
            <SpinnerDummyContent /> :
            <React.Fragment>
              {
                hasFailed(list.state) && `Failed to load ${typeTitle}`
              }

              {
                !hasFailed(list.state) &&
                (
                  list.data.size > 0 ?
                  <Row gutter={15}>
                    {
                      list.data.map((child, index) => (
                        <Col key={index} sm={24} md={12} lg={8}>
                          <Card data={child} history={history} />
                        </Col>
                      ))
                    }
                  </Row>
                  :
                  <div>No {typeTitle}s found.</div>
                )
              }
            </React.Fragment>
          }
        </Spin>
      </div>
    )
  }

}

export default compose(
  withRouter,
  connectByType({
    actions: ['loadList'],
    selects: ['list']
  }),
)(ChildList)
