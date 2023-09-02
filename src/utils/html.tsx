import { Fragment } from 'react'
import { ITree } from '../models'

export function renderHtml(tree: ITree, scriptUrl: string, styleUrl: string, cspSource: string): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Security-Policy" content={`default-src ${cspSource}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Terraform graph</title>

        <link href={styleUrl} rel="stylesheet" />
      </head>
      <body>
        <div id="root">
          <ul>{renderTree(tree)}</ul>
          {renderTables(tree)}
        </div>
        <script src={scriptUrl}></script>
      </body>
    </html>
  )
}

function renderTree(tree: ITree): JSX.Element {
  const children = Object.values(tree.children)
  return (
    <li>
      {tree.diff ? (
        <label htmlFor={encodeURIComponent(tree.diff.address)}>
          {renderActions(tree.diff.actions)} {tree.label}
        </label>
      ) : (
        <span>{tree.label}</span>
      )}
      {Boolean(children.length) && (
        <ul>
          {children.map((child, key) => (
            <Fragment key={key}>{renderTree(child)}</Fragment>
          ))}
        </ul>
      )}
    </li>
  )
}

function renderTables(tree: ITree): JSX.Element {
  const children = Object.values(tree.children)
  return (
    <>
      {tree.diff && (
        <>
          <input id={encodeURIComponent(tree.diff.address)} type="radio" name="table" />
          <table>
            <caption className="address">{tree.diff.address}</caption>
            <tbody>
              {tree.diff.changes.map((change) => (
                <tr key={change.key}>
                  <td className="nowrap">
                    {renderActions([change.action])} {change.key}
                  </td>
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
      {Boolean(children.length) && children.map((child, key) => <Fragment key={key}>{renderTables(child)}</Fragment>)}
    </>
  )
}

function renderActions(actions: string[]) {
  const actionSymbol: Record<string, string> = {
    create: '+',
    update: '~',
    delete: '-',
  }

  return actions.map((action) => (
    <span key={action} className={action}>
      {actionSymbol[action]}
    </span>
  ))
}
