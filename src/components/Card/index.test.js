import React from 'react'
import { mount } from 'enzyme'
import { Button } from 'antd'

import Card from './index'
import { mockHistory } from 'test/helpers'


const defaultData = {
  id: 1,
  name: 'Test Object',
  description: 'Description for the object',
  mdm_type: 'subscriber',
  has_partners: true,
  has_sites: true,
  has_sub_sites: true,
  has_business_processes: true,
}

const buttonTexts = [
  'Partners', 'Sites', 'Subsites', 'Business Processes'
]

it('should have all four buttons if object has them', () => {
  const wrapper = mount(<Card data={defaultData} history={mockHistory} />)

  expect(wrapper.find(Button).length).toEqual(4)
})

it('should not display button for the type when object does not have it', () => {
  const hasProps = [
    'has_partners', 'has_sites', 'has_sub_sites', 'has_business_processes',
  ]

  for (let i = 0; i < hasProps.length; i += 1) {
    const hasProp = hasProps[i]
    const data = {
      ...defaultData,
      [hasProp]: false,
    }

    const wrapper = mount(<Card data={data} history={mockHistory} />)

    for (let j = 0; j < buttonTexts.length; j += 1) {
      if (i === j) {
        expect(wrapper.find('.buttonsWrapper').text()).not.toEqual(expect.stringContaining(buttonTexts[j]))
      } else {
        expect(wrapper.find('.buttonsWrapper').text()).toEqual(expect.stringContaining(buttonTexts[j]))
      }
    }
  }
})

it('should have Go button for business process', () => {
  const data = {
    ...defaultData,
    mdm_type: 'business_process',
  }
  const wrapper = mount(<Card data={data} history={mockHistory} />)

  expect(wrapper.find(Button).length).toEqual(1)
  expect(wrapper.find(Button).text()).toEqual('Go')
})

it('should not have button area when no buttons available', () => {
  const data = {
    ...defaultData,
    has_partners: false,
    has_sites: false,
    has_sub_sites: false,
    has_business_processes: false,
  }
  const wrapper = mount(<Card data={data} history={mockHistory} />)

  expect(wrapper.find('.buttonsWrapper').length).toEqual(0)
})
