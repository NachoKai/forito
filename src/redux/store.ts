import { configureStore } from '@reduxjs/toolkit'

import { postsReducer as posts } from './posts'
import { authReducer as auth } from './auth'
import { loadingReducer as loading } from './loading'
import { loadState, saveState } from './sessionStorage'

export const reducers = {
	posts,
	auth,
	loading,
}

const preloadedState = loadState()

const store = configureStore({
	reducer: reducers,
	devTools: process.env.NODE_ENV !== 'production',
	preloadedState,
})

store.subscribe(() => {
	saveState(store.getState())
})

export default store
