import { Fragment } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import * as vscode from 'vscode'
import { IPlan, ITree } from '../models'
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
      webview.options = { enableScripts: true }
      webview.html = renderToStaticMarkup(this.renderHtml(tree, webview))
    } catch (error) {
      // Do nothing
    }
  }

  renderHtml(tree: ITree, webview: vscode.Webview): JSX.Element {
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'public', 'index.js'))
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'public', 'style.css'))

    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="Content-Security-Policy" content={`default-src ${webview.cspSource}`} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Terraform graph</title>

          <link href={styleUri.toString()} rel="stylesheet" />
        </head>
        <body>
          <div id="root">
            <ul>{this.renderTree(tree)}</ul>
            {this.renderTables(tree)}
          </div>
          <script src={scriptUri.toString()}></script>
        </body>
      </html>
    )
  }

  renderTree(tree: ITree): JSX.Element {
    const children = Object.values(tree.children)
    return (
      <li>
        {tree.diff ? (
          <label htmlFor={tree.diff.address} className={tree.diff.action}>
            {tree.label}
          </label>
        ) : (
          tree.label
        )}
        {Boolean(children.length) && (
          <ul>
            {children.map((child, key) => (
              <Fragment key={key}>{this.renderTree(child)}</Fragment>
            ))}
          </ul>
        )}
      </li>
    )
  }

  renderTables(tree: ITree): JSX.Element {
    const children = Object.values(tree.children)
    return (
      <>
        {tree.diff && (
          <>
            <input id={tree.diff.address} type="radio" name="table" />
            <table>
              <tbody>
                {tree.diff.changes.map((change) => (
                  <tr key={change.key}>
                    <td className={change.action}>{change.key}</td>
                    <td>
                      <pre>{change.before}</pre>
                    </td>
                    <td>→</td>
                    <td>
                      <pre>{change.after}</pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {Boolean(children.length) &&
          children.map((child, key) => <Fragment key={key}>{this.renderTables(child)}</Fragment>)}
      </>
    )
  }
}
