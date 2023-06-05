import { promises } from 'fs'
import { join } from 'path'
import * as vscode from 'vscode'
import { IPlan } from '../models'

export class GraphEditor implements vscode.CustomTextEditorProvider {
  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel) {
    const plan: IPlan = JSON.parse(document.getText())

    void promises
      .readFile(join(this.context.extensionUri.fsPath, 'public', 'index.html'), 'utf8')
      .then((html) => {
        webviewPanel.webview.options = { enableScripts: true }
        webviewPanel.webview.html = html
      })
      .then(() => webviewPanel.webview.postMessage(JSON.stringify(plan)))
  }
}
