import { applyMiddleware, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import promiseMiddleware from "redux-promise-middleware"

import composeWithDevTools from "./devTools"
import rootReducer from "./index"

// const persistedState = localStorage.getItem("forito")
// 	? JSON.parse(localStorage.getItem("forito"))
// 	: {}

export const store = createStore(
	rootReducer,
	undefined,
	composeWithDevTools(applyMiddleware(thunkMiddleware, promiseMiddleware))
)

// store.subscribe(() => {
// 	localStorage.setItem("forito", JSON.stringify(store.getState()))
// })

window._reduxStore = store
