import * as api from "../api"

/* ==========  CONSTANTS  =========== */

export const AUTH = "AUTH"
export const LOGOUT = "LOGOUT"

/* ==========  ACTIONS  =========== */

export const login = (formData, router) => async dispatch => {
	try {
		const { data } = await api.login(formData)

		dispatch({ type: AUTH, data })
		router.push("/")
	} catch (err) {
		console.error(err)
	}
}

export const signup = (formData, router) => async dispatch => {
	try {
		const { data } = await api.signup(formData)

		dispatch({ type: AUTH, data })
		router.push("/")
	} catch (err) {
		console.error(err)
	}
}

/* ==========  REDUCERS  =========== */

export const authReducer = (state = { authData: null }, action) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem("forito-profile", JSON.stringify({ ...action?.data }))

			return { ...state, authData: action.data, loading: false, errors: null }
		case LOGOUT:
			localStorage.removeItem("forito-profile")

			return { ...state, authData: null, loading: false, errors: null }
		default:
			return state
	}
}

/* ==========  SELECTORS  =========== */
