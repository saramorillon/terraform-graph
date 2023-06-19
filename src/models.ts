export interface IPlan {
  resource_changes: IResource[]
}

export interface IResource {
  address: string
  module_address?: string
  type: string
  name: string
  change: {
    actions: string[]
    before: Record<string, unknown> | null
    after: Record<string, unknown> | null
    after_unknown: Record<string, unknown>
  }
}

export interface IDiff {
  address: string
  actions: string[]
  changes: {
    key: string
    action: string
    before: string
    after: string
  }[]
}

export interface ITree {
  label: string
  diff?: IDiff
  children: Record<string, ITree>
}
