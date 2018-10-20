/**
 * This HOC is used to connect to store of specified type. It will pass
 * actions and selected data with generalized name to the wrapped component.
 *
 * Example usage:
 * export default connectByType({
 *   actions: ['loadList', 'loadDetail'],
 *   selects: ['list', 'detail']
 * })(WrappedComponent)
 */

import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  loadPartners,
  loadPartnerOrGetFromCache,
  selectPartners,
  selectCurrentPartner,
} from 'store/modules/partners'

import {
  loadSites,
  loadSiteOrGetFromCache,
  selectSites,
  selectCurrentSite,
  loadSubsites,
  loadSubsiteOrGetFromCache,
  selectSubsites,
  selectCurrentSubsite,
} from 'store/modules/sites'

import {
  loadBusinessProcesses,
  loadBusinessProcess,
  selectBusinessProcesses,
  selectCurrentBusinessProcess,
} from 'store/modules/businessProcesses'

const ACTIONS_AND_SELECTS_BY_TYPES = {
  partner: {
    loadList: loadPartners,
    loadDetail: loadPartnerOrGetFromCache,
    selectList: selectPartners,
    selectDetail: selectCurrentPartner,
  },
  site: {
    loadList: loadSites,
    loadDetail: loadSiteOrGetFromCache,
    selectList: selectSites,
    selectDetail: selectCurrentSite,
  },
  subsite: {
    loadList: loadSubsites,
    loadDetail: loadSubsiteOrGetFromCache,
    selectList: selectSubsites,
    selectDetail: selectCurrentSubsite,
  },
  businessProcess: {
    loadList: loadBusinessProcesses,
    loadDetail: loadBusinessProcess,
    selectList: selectBusinessProcesses,
    selectDetail: selectCurrentBusinessProcess,
  },
}

export default ({ actions, selects }) => Component => props => {
  const type = props.type
  if (!type) {
    throw new Error('Failed to connect store by type: no type specified')
  }

  const actionsAndSelects = ACTIONS_AND_SELECTS_BY_TYPES[type]
  if (!actionsAndSelects) {
    throw new Error(`Failed to connect store for type ${type}: no actions/selectors defined`)
  }

  const selectorsForConnection = {}
  const actionsForConnection = {}
  Object.keys(actionsAndSelects).forEach(actionOrSelectorName => {
    if (actions.indexOf(actionOrSelectorName) >= 0) {
      actionsForConnection[actionOrSelectorName] = actionsAndSelects[actionOrSelectorName]
    }

    let selectName = actionOrSelectorName.substr(6)
    selectName = selectName.charAt(0).toLowerCase() + selectName.substr(1)
    if (selects.indexOf(selectName) >= 0) {
      selectorsForConnection[selectName] = actionsAndSelects[actionOrSelectorName]
    }
  })

  const ConnectByTypeHOC = connect(
    createStructuredSelector(selectorsForConnection),
    actionsForConnection,
  )(Component)

  return <ConnectByTypeHOC
    type={type}
    {...props}
  />
}
