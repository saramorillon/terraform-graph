import { IDiff, IDiffChange, IPlan, IResource, IResourceChange, ITree } from '../src/models'

export function mockPlan(plan: Partial<IPlan> = {}): IPlan {
  return {
    resource_changes: [mockResource()],
    ...plan,
  }
}

export function mockResource(resource: Partial<IResource> = {}): IResource {
  return {
    address: 'resource.address',
    change: mockResourceChange(),
    ...resource,
  }
}

export function mockResourceChange(change: Partial<IResourceChange> = {}): IResourceChange {
  return {
    actions: [],
    before: {},
    after: {},
    after_unknown: {},
    ...change,
  }
}

export function mockTree(tree: Partial<ITree> = {}): ITree {
  return {
    label: 'label',
    children: {},
    ...tree,
  }
}

export function mockDiff(diff: Partial<IDiff> = {}): IDiff {
  return {
    address: 'resource.address',
    actions: [],
    changes: [],
    ...diff,
  }
}

export function mockDiffChange(change: Partial<IDiffChange> = {}): IDiffChange {
  return {
    key: 'key',
    action: 'action',
    before: 'before',
    after: 'after',
    ...change,
  }
}
