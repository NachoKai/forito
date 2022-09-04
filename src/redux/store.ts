import { configureStore } from '@reduxjs/toolkit'

import { authReducer as auth } from './auth'
import { loadingReducer as loading } from './loading'
import { postsReducer as posts } from './posts'

export const reducers = {
	posts,
	auth,
	loading,
}

const store = configureStore({
	reducer: reducers,
	devTools: process.env.NODE_ENV !== 'production',
})

export default store
