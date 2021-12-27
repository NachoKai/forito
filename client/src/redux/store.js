import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

import composeWithDevTools from './devTools'
import rootReducer from './rootReducer'
import { loadState, saveState } from './sessionStorage.js'

const persistedState = loadState()

export const store = createStore(
	rootReducer,
	persistedState,
	composeWithDevTools(applyMiddleware(thunkMiddleware, promiseMiddleware))
)

store.subscribe(() => {
	saveState(store.getState())
})

window._reduxStore = store
