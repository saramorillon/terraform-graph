import * as vscode from 'vscode'
import { graphCommand } from './commands/graph'
import { GraphEditor } from './editors/graph'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('terraform-graph.show', graphCommand),
    vscode.window.registerCustomEditorProvider('terraform-graph.view', new GraphEditor(context))
  )
}
