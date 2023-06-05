import * as vscode from 'vscode'
import { graphCommand } from './commands/graph'
import { GraphEditor } from './editors/graph'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('terraform-ui.graph', graphCommand),
    vscode.window.registerCustomEditorProvider('terraform-ui.graph', new GraphEditor(context))
  )
}
