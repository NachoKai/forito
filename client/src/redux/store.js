import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import promiseMiddleware from "redux-promise-middleware"

import composeWithDevTools from "./devTools"
import rootReducer from "./index"

export const store = createStore(
	rootReducer,
	undefined,
	composeWithDevTools(applyMiddleware(thunkMiddleware, promiseMiddleware))
)

window._reduxStore = store
