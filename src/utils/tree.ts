import { IPlan, ITree } from '../models'
import { getDiff } from './diff'

export function generateTree(plan: IPlan): ITree {
  const tree: ITree = { label: 'root', children: {} }

  for (const resource of plan.resource_changes) {
    if (resource.change.actions[0] === 'no-op') continue
    let curr = tree
    for (const label of splitAddress(resource.address)) {
      if (!curr.children[label]) {
        curr.children[label] = { label, children: {} }
      }
      curr = curr.children[label]
    }
    curr.diff = getDiff(resource)
  }

  return tree
}

function splitAddress(address: string) {
  const labels: string[] = []
  let label = ''
  let inForEach = false

  for (const char of address) {
    if (char === '[') inForEach = true
    else if (char === ']') inForEach = false

    if (char === '[' || char === ']' || (char === '.' && !inForEach)) {
      labels.push(label)
      label = ''
    } else if (char !== '"' && char !== "'") {
      label += char
    }
  }

  labels.push(label)

  return labels.filter(Boolean)
}
