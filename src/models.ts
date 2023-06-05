export interface IPlan {
  resource_changes: IResource[]
}

export interface IResource {
  address: string
  module_address?: string
  type: string
  name: string
  change: IChange
}

export interface IChange {
  actions: string[]
  before: { [key: string]: unknown } | null
  after: { [key: string]: unknown } | null
  after_unknown: { [key: string]: unknown }
}

export interface ITree {
  label: string
  resource?: IResource
  children: {
    [key: string]: ITree
  }
}
