const vscode = acquireVsCodeApi()

function updateSelected(id) {
  document.querySelectorAll('.selected').forEach((selected) => selected.classList.remove('selected'))
  const label = document.querySelector(`label[for="${id}"]`)
  if (label) {
    label.classList.add('selected')
  }
}

document.querySelectorAll('input').forEach((input) =>
  input.addEventListener('change', (event) => {
    updateSelected(event.currentTarget.id)
    vscode.setState({ selected: event.currentTarget.id })
  })
)

const state = vscode.getState()
if (state && state.selected) {
  const input = document.getElementById(state.selected)
  if (input) {
    input.checked = true
    updateSelected(state.selected)
  }
}
