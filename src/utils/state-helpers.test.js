import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import {
  REQUEST_INITIAL,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
} from 'constants.js'
import {
  PaginatedListData,
  createDetailDataType,
} from 'store/common/models'
import {
  successAction,
  failAction,
  setPageAction,
  setPageSizeAction,
  convertToListRecord,
  requestLoopHandlersForGet,
  requestLoopHandlersForUpdate,
} from './state-helpers'


const DummyRecord = Immutable.Record({
  id: 0,
  name: '',
  description: '',
  mdm_type: 'dummy_record',
})

const DummyRecordData = createDetailDataType(DummyRecord())

const State = Immutable.Record({
  dummyRecord: DummyRecordData(),
  dummyRecordList: PaginatedListData(),
  updateDummyRecordState: REQUEST_INITIAL,
})

const initialState = State()

const TEST_ACTION = 'adept_edge/test/action'

const testAction = createAction(TEST_ACTION)
const testActionSuccess = createAction(successAction(TEST_ACTION))
const testActionFail = createAction(failAction(TEST_ACTION))
const testActionSetPage = createAction(setPageAction(TEST_ACTION))
const testActionSetPageSize = createAction(setPageSizeAction(TEST_ACTION))


it('should have correct initial state', () => {
  const state = State()
  expect(state.dummyRecord.state).toEqual(REQUEST_INITIAL)
  expect(state.dummyRecordList.state).toEqual(REQUEST_INITIAL)
  expect(state.dummyRecordList.data.size).toEqual(0)
})

/* Test for get detail data handlers */

it('should set correct pending state for detail data', () => {
  let state = State()

  const reducer = handleActions(requestLoopHandlersForGet({
    action: TEST_ACTION,
    dataField: 'dummyRecord',
    getDataFromPayload: payload => DummyRecord(payload),
  }), initialState)

  state = reducer(state, testAction({ id: 10 }))

  expect(state.dummyRecord.state).toEqual(REQUEST_PENDING)
  expect(state.dummyRecord.id).toEqual(10)

  // requestLoopHandlersForGet has initialValues field, and it's null when omitted
  expect(state.dummyRecord.data).toBeNull()
})

it('should set correct success state for detail data', () => {
  let state = State()

  const reducer = handleActions(requestLoopHandlersForGet({
    action: TEST_ACTION,
    dataField: 'dummyRecord',
    getDataFromPayload: payload => DummyRecord(payload),
  }), initialState)

  const dummyRecordPayload = {
    id: 10,
    name: 'Dummy data',
    description: 'Description for dummy data'
  }

  state = reducer(state, testActionSuccess(dummyRecordPayload))

  expect(state.dummyRecord.state).toEqual(REQUEST_SUCCESS)
  expect(state.dummyRecord.data.id).toEqual(dummyRecordPayload.id)
  expect(state.dummyRecord.data.name).toEqual(dummyRecordPayload.name)
  expect(state.dummyRecord.data.description).toEqual(dummyRecordPayload.description)
  expect(state.dummyRecord.data.mdm_type).toEqual('dummy_record')
})

it('should set correct failure state for detail data', () => {
  let state = State()

  const reducer = handleActions(requestLoopHandlersForGet({
    action: TEST_ACTION,
    dataField: 'dummyRecord',
    getDataFromPayload: payload => DummyRecord(payload),
  }), initialState)

  state = reducer(state, testActionFail())

  expect(state.dummyRecord.state).toEqual(REQUEST_FAIL)

  // requestLoopHandlersForGet has initialValues field, and it's null when omitted
  expect(state.dummyRecord.data).toBeNull()
})

/* Test for get list data handlers */

it('should set correct pending state for list data', () => {
  let state = State()

  const reducer = handleActions(requestLoopHandlersForGet({
    action: TEST_ACTION,
    dataField: 'dummyRecordList',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload, DummyRecord),
  }), initialState)

  state = reducer(state, testAction())

  expect(state.dummyRecordList.state).toEqual(REQUEST_PENDING)
  expect(state.dummyRecordList.data.size).toEqual(0)
})

it('should set correct success state for list data', () => {
  let state = State()

  const reducer = handleActions(requestLoopHandlersForGet({
    action: TEST_ACTION,
    dataField: 'dummyRecordList',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload, DummyRecord),
  }), initialState)

  const dummyRecordListPayload = [{
    id: 10,
    name: 'Dummy data',
    description: 'Description for dummy data'
  }, {
    id: 11,
    name: 'Another dummy data',
    description: 'Here comes another dummy data'
  }]

  state = reducer(state, testActionSuccess(dummyRecordListPayload))

  expect(state.dummyRecordList.state).toEqual(REQUEST_SUCCESS)
  expect(state.dummyRecordList.data.size).toEqual(dummyRecordListPayload.length)
  for (let i = 0; i < dummyRecordListPayload.length; i += 1) {
    expect(state.dummyRecordList.data.get(i).id).toEqual(dummyRecordListPayload[i].id)
    expect(state.dummyRecordList.data.get(i).name).toEqual(dummyRecordListPayload[i].name)
    expect(state.dummyRecordList.data.get(i).description).toEqual(dummyRecordListPayload[i].description)
    expect(state.dummyRecordList.data.get(i).mdm_type).toEqual('dummy_record')
  }
})

it('should set correct failure state for list data', () => {
  let state = State()

  const reducer = handleActions(requestLoopHandlersForGet({
    action: TEST_ACTION,
    dataField: 'dummyRecordList',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload, DummyRecord),
  }), initialState)

  state = reducer(state, testActionFail())

  expect(state.dummyRecordList.state).toEqual(REQUEST_FAIL)
  expect(state.dummyRecordList.data.size).toEqual(0)
})

/* Test for paginated list api */

it('should set correct success state for paginated list data', () => {
  let state = State()

  const reducer = handleActions(requestLoopHandlersForGet({
    action: TEST_ACTION,
    dataField: 'dummyRecordList',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload.results, DummyRecord),
    usePagination: true,
  }), initialState)

  const dummyRecordListPayload = {
    results: [{
      id: 10,
      name: 'Dummy data',
      description: 'Description for dummy data'
    }, {
      id: 11,
      name: 'Another dummy data',
      description: 'Here comes another dummy data'
    }],
    count: 10,
  }

  state = reducer(state, testActionSuccess(dummyRecordListPayload))

  expect(state.dummyRecordList.state).toEqual(REQUEST_SUCCESS)
  expect(state.dummyRecordList.data.size).toEqual(dummyRecordListPayload.results.length)
  expect(state.dummyRecordList.count).toEqual(10)
  for (let i = 0; i < dummyRecordListPayload.length; i += 1) {
    expect(state.dummyRecordList.data.get(i).id).toEqual(dummyRecordListPayload[i].id)
    expect(state.dummyRecordList.data.get(i).name).toEqual(dummyRecordListPayload[i].name)
    expect(state.dummyRecordList.data.get(i).description).toEqual(dummyRecordListPayload[i].description)
    expect(state.dummyRecordList.data.get(i).mdm_type).toEqual('dummy_record')
  }
})

it('should set page for paginated list data', () => {
  let state = State()

  const reducer = handleActions(requestLoopHandlersForGet({
    action: TEST_ACTION,
    dataField: 'dummyRecordList',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload.results, DummyRecord),
    usePagination: true,
  }), initialState)

  state = reducer(state, testActionSetPage(5))

  expect(state.dummyRecordList.page).toEqual(5)
})

it('should set page size for paginated list data', () => {
  let state = State()

  const reducer = handleActions(requestLoopHandlersForGet({
    action: TEST_ACTION,
    dataField: 'dummyRecordList',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload.results, DummyRecord),
    usePagination: true,
  }), initialState)

  state = reducer(state, testActionSetPageSize(20))

  expect(state.dummyRecordList.pageSize).toEqual(20)
})

/* Test for create/update/delete api handlers */

it('should set correct pending state for data submit action', () => {
  let state = State()

  const reducer = handleActions(requestLoopHandlersForUpdate({
    action: TEST_ACTION,
    stateField: 'updateDummyRecordState',
  }), initialState)

  state = reducer(state, testAction())

  expect(state.updateDummyRecordState).toEqual(REQUEST_PENDING)
})

it('should set correct success state for data submit action', () => {
  let state = State()

  const reducer = handleActions(requestLoopHandlersForUpdate({
    action: TEST_ACTION,
    stateField: 'updateDummyRecordState',
  }), initialState)

  state = reducer(state, testActionSuccess())

  expect(state.updateDummyRecordState).toEqual(REQUEST_SUCCESS)
})

it('should set correct failure state for data submit action', () => {
  let state = State()

  const reducer = handleActions(requestLoopHandlersForUpdate({
    action: TEST_ACTION,
    stateField: 'updateDummyRecordState',
  }), initialState)

  state = reducer(state, testActionFail())

  expect(state.updateDummyRecordState).toEqual(REQUEST_FAIL)
})
