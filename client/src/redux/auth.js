import * as api from "../api"
import showError from "../utils/showError"
import { getUser } from "../utils/getUser"

/* ==========  CONSTANTS  ========== */

export const AUTH = "AUTH"
export const LOGOUT = "LOGOUT"
const SAVE_POST = "SAVE_POST"

/* ==========  ACTIONS  ========== */

export const login = (formData, history) => async dispatch => {
	try {
		const { data } = await api.login(formData)

		dispatch({ type: AUTH, data })
		history.push("/")
		history.go(0)
	} catch (err) {
		showError("Something went wrong when trying to log in. Please try again.")
		console.error(err)
	}
}

export const logout = history => async dispatch => {
	try {
		dispatch({ type: LOGOUT })
		history.push("/")
		history.go(0)
		history.push("/auth")
	} catch (err) {
		showError("Something went wrong when trying to log out. Please try again.")
		console.error(err)
	}
}

export const signup = (formData, history) => async dispatch => {
	try {
		const { data } = await api.signup(formData)

		dispatch({ type: AUTH, data })
		history.push("/")
		history.go(0)
	} catch (err) {
		showError("Something went wrong when trying to sign up. Please try again.")
		console.error(err)
	}
}

export const savePost = id => async dispatch => {
	const user = getUser()

	try {
		const { data } = await api.savePost(id, user?.token)

		dispatch({ type: SAVE_POST, payload: data })
	} catch (err) {
		showError("Something went wrong when trying to save post. Please try again.")
		console.error(err)
	}
}

/* ==========  REDUCERS  ========== */

const initialState = {
	authData: null,
	savedPosts: [],
}

export const authReducer = (state = initialState, action) => {
	const { type, data } = action

	switch (type) {
		case AUTH:
			localStorage.setItem("forito-profile", JSON.stringify({ ...data }))

			return { ...state, authData: data, loading: false, errors: null }
		case LOGOUT:
			localStorage.removeItem("forito-profile")

			return { ...state, authData: null, loading: false, errors: null }
		case SAVE_POST:
			return {
				...state,
				savedPosts: [...state.savedPosts, data],
			}
		default:
			return state
	}
}
