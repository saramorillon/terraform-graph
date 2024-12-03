import { parse } from 'path'
import * as vscode from 'vscode'

function getCwd() {
  if (vscode.window.activeTextEditor) {
    return parse(vscode.window.activeTextEditor.document.uri.fsPath).dir
  }
  if (vscode.workspace.workspaceFolders) {
    return vscode.workspace.workspaceFolders[0].uri.fsPath
  }
  if (vscode.workspace.workspaceFile) {
    return parse(vscode.workspace.workspaceFile.fsPath).dir
  }
}

export function graphCommand() {
  const cwd = getCwd()
  if (!cwd) return

  // Get the configured shell command
  const config = vscode.workspace.getConfiguration(
    "terraform-graph"
  );
  const shellCommand = config.command ?? 'terraform plan -out=plan && terraform show -json plan > plan.tfgraph';

  const terminal = vscode.window.createTerminal({ name: 'TfGraph', cwd })
  terminal.show()
  terminal.sendText(shellCommand)
}
