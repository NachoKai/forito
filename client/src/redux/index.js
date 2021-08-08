import { combineReducers } from "redux"

import { postsReducer as posts } from "./posts"
import { authReducer as auth } from "./auth"

export default combineReducers({
	posts,
	auth,
})
