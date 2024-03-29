import { isEqual } from 'radash'
import { IDiff, IResource } from '../models'

export function getDiff(resource: IResource): IDiff {
  const diff: IDiff = { address: resource.address, actions: resource.change.actions, changes: [] }
  resource.change.before = resource.change.before || {}
  resource.change.after = resource.change.after || {}
  for (const key of Object.keys(resource.change.after_unknown)) {
    resource.change.after[key] = '(known after apply)'
  }
  for (const key of getKeys(resource.change.before, resource.change.after)) {
    const action = getAction(resource.change.before[key], resource.change.after[key])
    if (action === 'no-op') continue
    diff.changes.push({
      key,
      action,
      before: getContent(resource.change.before[key]),
      after: getContent(resource.change.after[key]),
    })
  }
  return diff
}

function getKeys(before: { [key: string]: unknown }, after: { [key: string]: unknown }): string[] {
  const beforeKeys = Object.keys(before)
  const afterKeys = Object.keys(after)

  const keys = new Set<string>()
  for (let i = 0; i < Math.max(beforeKeys.length, afterKeys.length); i++) {
    if (beforeKeys[i]) keys.add(beforeKeys[i])
    if (afterKeys[i]) keys.add(afterKeys[i])
  }

  return [...keys]
}

function getAction(before: unknown, after: unknown): string {
  if (isEqual(before, after)) return 'no-op'
  if (!before) return 'create'
  if (!after) return 'delete'
  return 'update'
}

function getContent(value: unknown): string {
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }
  if (typeof value === 'string') {
    try {
      return getContent(JSON.parse(value))
    } catch (error) {
      return value || '(none)'
    }
  }
  return String(value ?? '(none)')
}
