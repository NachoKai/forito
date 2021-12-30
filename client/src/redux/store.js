import { configureStore } from '@reduxjs/toolkit'

import { postsReducer as posts } from './posts'
import { authReducer as auth } from './auth'

const reducers = {
	posts,
	auth,
}

const store = configureStore({
	reducer: reducers,
	devTools: process.env.NODE_ENV !== 'production',
})

export default store
