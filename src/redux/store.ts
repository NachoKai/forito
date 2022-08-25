import { configureStore } from '@reduxjs/toolkit'

import { postsReducer as posts } from './posts'
import { authReducer as auth } from './auth'
import { loadingReducer as loading } from './loading'

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
