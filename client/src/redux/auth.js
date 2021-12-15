import * as api from "../api"
import showError from "../utils/showError"

/* ==========  CONSTANTS  ========== */

export const AUTH = "AUTH"
export const LOGOUT = "LOGOUT"
export const FETCH_USER = "FETCH_USER"
export const CLEAN_UP = "CLEAN_UP"

/* ==========  ACTIONS  ========== */

export const login = (formData, navigate) => async dispatch => {
	try {
		const { data } = await api.login(formData)

		dispatch({ type: AUTH, data })
		navigate("/")
	} catch (err) {
		showError("Something went wrong when trying to log in. Please try again.")
		console.error(err)
	}
}

export const logout = navigate => async dispatch => {
	try {
		dispatch({ type: LOGOUT })
		navigate("/auth")
	} catch (err) {
		showError("Something went wrong when trying to log out. Please try again.")
		console.error(err)
	}
}

export const signup = (formData, navigate) => async dispatch => {
	try {
		const { data } = await api.signup(formData)

		dispatch({ type: AUTH, data })
		navigate("/")
	} catch (err) {
		showError("Something went wrong when trying to sign up. Please try again.")
		console.error(err)
	}
}

export const getUser = id => async dispatch => {
	try {
		dispatch(cleanUp())
		const { data } = await api.fetchUser(id)

		dispatch({ type: FETCH_USER, data: { user: data } })
	} catch (err) {
		// showError("Something went wrong when trying to get user. Please try again.")
		console.error(err)
	}
}

const cleanUp = () => ({ type: CLEAN_UP })

/* ==========  REDUCERS  ========== */

const initialState = {
	authData: null,
	user: null,
}

export const authReducer = (state = initialState, action) => {
	const { type, data } = action

	switch (type) {
		case CLEAN_UP:
			return initialState
		case AUTH:
			localStorage.setItem("forito-profile", JSON.stringify({ ...data }))

			return { ...state, authData: data, loading: false, errors: null }
		case LOGOUT:
			localStorage.removeItem("forito-profile")

			return { ...state, authData: null, loading: false, errors: null }
		case FETCH_USER:
			return { ...state, user: data.user }
		default:
			return state
	}
}
