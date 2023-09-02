export interface IPlan {
  resource_changes: IResource[]
}

export interface IResource {
  address: string
  change: IResourceChange
}

export interface IResourceChange {
  actions: string[]
  before: Record<string, unknown> | null
  after: Record<string, unknown> | null
  after_unknown: Record<string, unknown>
}

export interface ITree {
  label: string
  diff?: IDiff
  children: Record<string, ITree>
}

export interface IDiff {
  address: string
  actions: string[]
  changes: IDiffChange[]
}

export interface IDiffChange {
  key: string
  action: string
  before: string
  after: string
}
