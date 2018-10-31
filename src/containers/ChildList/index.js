import React, { Component } from 'react'
import { compose } from 'redux'
import { Row, Col, Spin, Icon } from 'antd'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withRouter } from 'react-router'
import { pluralize, titleize } from 'inflection'

import connectByType from 'hoc/connectByType'
import SpinnerDummyContent from 'components/SpinnerDummyContent'
import BusinessProcessCard from 'components/BusinessProcessCard'
import PartnerCard from 'components/PartnerCard'
import SiteCard from 'components/SiteCard'
import { isLoading, hasFailed } from 'utils/state-helpers'


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

  static cardComponents = {
    partner: PartnerCard,
    businessProcess: BusinessProcessCard,
    site: SiteCard,
    subsite: SiteCard,
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

    const Card = ChildList.cardComponents[type]
    if (!Card) {
      console.error(`Card component not found for ${type} type`)
      error = true
    }

    const spinning = isLoading(list.state) || error
    let typeTitle = type.replace(/[A-Z]/g, c => ' ' + c)
    typeTitle = pluralize(titleize(typeTitle))

    return (
      <div>
        <h1>
          <Icon type="profile" /> {typeTitle} for {parent.data.name}
        </h1>

        <Spin spinning={spinning}>
          {
            spinning ?
            <SpinnerDummyContent /> :
            <React.Fragment>
              {
                hasFailed(list.state) && `Failed to load ${typeTitle}`
              }

              {
                list.data.size > 0 ?
                <Row gutter={15}>
                  {
                    list.data.map((child, index) => (
                      <Col key={index} sm={24} md={12} lg={8}>
                        <Card data={child} history={history} isSubsite={type === 'subsite'} />
                      </Col>
                    ))
                  }
                </Row>
                :
                <div>No {type}s found.</div>
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
