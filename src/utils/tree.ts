import { IPlan, ITree } from '../models'
import { getDiff } from './diff'

export function generateTree(plan: IPlan): ITree {
  const tree: ITree = { label: 'root', children: {} }

  for (const resource of plan.resource_changes) {
    if (resource.change.actions[0] === 'no-op') continue
    let curr = tree
    for (const label of resource.address.split('.')) {
      if (!curr.children[label]) {
        curr.children[label] = { label, children: {} }
      }
      curr = curr.children[label]
    }
    curr.diff = getDiff(resource)
  }

  return tree
}
