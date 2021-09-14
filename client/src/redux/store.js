import { applyMiddleware, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import promiseMiddleware from "redux-promise-middleware"

import composeWithDevTools from "./devTools"
import rootReducer from "./index"

const persistedState = sessionStorage.getItem("forito")
	? JSON.parse(sessionStorage.getItem("forito"))
	: {}

export const store = createStore(
	rootReducer,
	persistedState,
	composeWithDevTools(applyMiddleware(thunkMiddleware, promiseMiddleware))
)

store.subscribe(() => {
	sessionStorage.setItem("forito", JSON.stringify(store.getState()))
})

window._reduxStore = store
