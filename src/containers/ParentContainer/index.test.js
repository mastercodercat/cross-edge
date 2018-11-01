import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'

import { ParentContainer } from './index'

import {
  REQUEST_INITIAL,
  REQUEST_SUCCESS,
} from 'constants.js'
import { Site, SiteData } from 'store/modules/sites'
import { sites } from 'test/fixtures/bpm'


const ChildMock = (props) => <div>Child content</div>

const props = {
  type: 'site',
  detail: SiteData(),
  loadDetail: jest.fn(),
  match: { params: { parentId: 10 } },
  children: <ChildMock />
}

it('should show spinner when data not loaded', () => {
  const wrapper = mount(<ParentContainer
    {...props}
  />)

  expect(wrapper.find('.ant-spin').length).not.toEqual(0)
  expect(props.loadDetail.mock.calls).toBeTruthy()
})

it('should show children when parent detail loaded', () => {
  const localProps = Object.assign({}, props)
  localProps.detail = SiteData({
    data: Site(sites[0]),
    state: REQUEST_SUCCESS,
  })

  const wrapper = mount(<ParentContainer
    {...localProps}
  />)

  expect(wrapper.text()).toEqual(expect.stringContaining('Child content'))
})
