import { renderHtml } from '../../src/utils/html'
import { mockDiff, mockDiffChange, mockTree } from '../mocks'

describe('renderHtml', () => {
  it('should render empty html', () => {
    const tree = mockTree()
    const jsx = renderHtml(tree, 'scriptUrl', 'styleUrl', 'cspSource')
    expect(jsx).toMatchSnapshot()
  })

  it('should render non-clickable tree label if no diff', () => {
    const tree = mockTree()
    const jsx = renderHtml(tree, 'scriptUrl', 'styleUrl', 'cspSource')
    expect(jsx).toMatchSnapshot()
  })

  it('should render clickable tree label if diff', () => {
    const tree = mockTree({ diff: mockDiff() })
    const jsx = renderHtml(tree, 'scriptUrl', 'styleUrl', 'cspSource')
    expect(jsx).toMatchSnapshot()
  })

  it('should render diff in table', () => {
    const tree = mockTree({ diff: mockDiff({ changes: [mockDiffChange()] }) })
    const jsx = renderHtml(tree, 'scriptUrl', 'styleUrl', 'cspSource')
    expect(jsx).toMatchSnapshot()
  })

  it('should render diff create action', () => {
    const tree = mockTree({ diff: mockDiff({ actions: ['create'] }) })
    const jsx = renderHtml(tree, 'scriptUrl', 'styleUrl', 'cspSource')
    expect(jsx).toMatchSnapshot()
  })

  it('should render diff delete action', () => {
    const tree = mockTree({ diff: mockDiff({ actions: ['delete'] }) })
    const jsx = renderHtml(tree, 'scriptUrl', 'styleUrl', 'cspSource')
    expect(jsx).toMatchSnapshot()
  })

  it('should render diff update action', () => {
    const tree = mockTree({ diff: mockDiff({ actions: ['update'] }) })
    const jsx = renderHtml(tree, 'scriptUrl', 'styleUrl', 'cspSource')
    expect(jsx).toMatchSnapshot()
  })

  it('should render change create action', () => {
    const tree = mockTree({ diff: mockDiff({ changes: [mockDiffChange({ action: 'create' })] }) })
    const jsx = renderHtml(tree, 'scriptUrl', 'styleUrl', 'cspSource')
    expect(jsx).toMatchSnapshot()
  })

  it('should render change delete action', () => {
    const tree = mockTree({ diff: mockDiff({ changes: [mockDiffChange({ action: 'delete' })] }) })
    const jsx = renderHtml(tree, 'scriptUrl', 'styleUrl', 'cspSource')
    expect(jsx).toMatchSnapshot()
  })

  it('should render change update action', () => {
    const tree = mockTree({ diff: mockDiff({ changes: [mockDiffChange({ action: 'update' })] }) })
    const jsx = renderHtml(tree, 'scriptUrl', 'styleUrl', 'cspSource')
    expect(jsx).toMatchSnapshot()
  })
})
