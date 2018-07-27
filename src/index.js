function renderApp (newAppState, oldAppState = {}) {
if (newAppState === oldAppState) return
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) return
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

function reducer (state, action) {
  // data initial
  if (!state) {
    return {
      title: {
        text: 'this is title',
        color: 'red',
      },
      content: {
        text: 'this is content',
        color: 'blue'
      }
    }
  }
  // action dispatch
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state
  }
}

function createStore (reducer) {
  let state = null
  const listeners = []
  // observer model to listern changes
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({})
  return { getState, dispatch, subscribe }
}
const store = createStore(reducer)
let oldState = store.getState()
store.subscribe(() => {
  const newState = store.getState()
  renderApp(newState, oldState) 
  oldState = newState
})

renderApp(store.getState())
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: 'this is dispatch' })
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' })

