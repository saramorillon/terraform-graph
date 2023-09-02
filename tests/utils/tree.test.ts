import { generateTree } from '../../src/utils/tree'
import { mockPlan, mockResource, mockResourceChange } from '../mocks'

describe('generateTree', () => {
  it('should return empty tree', () => {
    const plan = mockPlan({ resource_changes: [] })
    const tree = generateTree(plan)
    expect(tree).toMatchSnapshot()
  })

  it('should not add no-op change in tree', () => {
    const plan = mockPlan({ resource_changes: [mockResource({ change: mockResourceChange({ actions: ['no-op'] }) })] })
    const tree = generateTree(plan)
    expect(tree).toMatchSnapshot()
  })

  it('should add change in tree', () => {
    const plan = mockPlan()
    const tree = generateTree(plan)
    expect(tree).toMatchSnapshot()
  })
})
