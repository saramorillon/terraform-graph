import { renderToStaticMarkup } from 'react-dom/server'
import * as vscode from 'vscode'
import { IPlan } from '../models'
import { renderHtml } from '../utils/html'
import { generateTree } from '../utils/tree'

export class GraphEditor implements vscode.CustomTextEditorProvider {
  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel): void {
    this.updateWebiew(document, webviewPanel.webview)

    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.uri.toString() === document.uri.toString()) {
        this.updateWebiew(e.document, webviewPanel.webview)
      }
    })

    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose()
    })
  }

  updateWebiew(document: vscode.TextDocument, webview: vscode.Webview): void {
    try {
      const plan: IPlan = JSON.parse(document.getText())
      const tree = generateTree(plan)
      const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'public', 'index.js'))
      const stylesUri = [
        this.asWebviewUri(webview, 'public', 'style.css'),
        this.asWebviewUri(webview, 'node_modules', '@vscode/codicons', 'dist', 'codicon.css'),
        this.asWebviewUri(webview, 'node_modules', 'monaco-editor', 'min', 'vs', 'editor', 'editor.main.css'),
      ]
      const jsx = renderHtml(tree, scriptUri.toString(), stylesUri, webview.cspSource)
      webview.options = { enableScripts: true }
      webview.html = renderToStaticMarkup(jsx)
      webview.onDidReceiveMessage((message) => {
        if (message.type === 'copy') {
          void vscode.env.clipboard
            .writeText(message.content)
            .then(() => vscode.window.setStatusBarMessage('Copied to clipboard'))
            .then((s) => setTimeout(() => s.dispose(), 1000))
        }
      })
    } catch (error) {
      // Do nothing
    }
  }

  asWebviewUri(webview: vscode.Webview, ...pathSegments: string[]) {
    return webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, ...pathSegments)).toString()
  }
}
