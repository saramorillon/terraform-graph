import { getDiff } from '../../src/utils/diff'
import { mockResource, mockResourceChange } from '../mocks'

describe('getDiff', () => {
  it('should return empty diff', () => {
    const resource = mockResource()
    const diff = getDiff(resource)
    expect(diff).toMatchSnapshot()
  })

  it('should not add no-op change in diff', () => {
    const resource = mockResource({ change: mockResourceChange({ before: { key: 'value' }, after: { key: 'value' } }) })
    const diff = getDiff(resource)
    expect(diff).toMatchSnapshot()
  })

  it('should add created resource in diff', () => {
    const resource = mockResource({ change: mockResourceChange({ after: { key: 'value' } }) })
    const diff = getDiff(resource)
    expect(diff).toMatchSnapshot()
  })

  it('should add created unknown resource in diff', () => {
    const resource = mockResource({ change: mockResourceChange({ after_unknown: { key: true } }) })
    const diff = getDiff(resource)
    expect(diff).toMatchSnapshot()
  })

  it('should add deleted resource in diff', () => {
    const resource = mockResource({ change: mockResourceChange({ before: { key: 'value' } }) })
    const diff = getDiff(resource)
    expect(diff).toMatchSnapshot()
  })

  it('should add updated resource in diff', () => {
    const resource = mockResource({
      change: mockResourceChange({ before: { key: 'value' }, after: { key: 'value2' } }),
    })
    const diff = getDiff(resource)
    expect(diff).toMatchSnapshot()
  })

  it('should stringify object value', () => {
    const resource = mockResource({ change: mockResourceChange({ after: { key: { prop: 'value' } } }) })
    const diff = getDiff(resource)
    expect(diff).toMatchSnapshot()
  })

  it('should return none for empty values', () => {
    const resource = mockResource({ change: mockResourceChange({ after: { key: '' } }) })
    const diff = getDiff(resource)
    expect(diff).toMatchSnapshot()
  })
})
