// import { createSelector } from "reselect"

import * as api from "../api"

/* ==========  CONSTANTS  =========== */

export const AUTH = "AUTH"
export const LOGOUT = "LOGOUT"

/* ==========  ACTIONS  =========== */

export const signin = (formData, router) => async dispatch => {
	try {
		const { data } = await api.signIn(formData)

		dispatch({ type: AUTH, data })
		router.push("/")
	} catch (err) {
		console.error(err)
	}
}

export const signup = (formData, router) => async dispatch => {
	try {
		const { data } = await api.signUp(formData)

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
			localStorage.setItem("profile", JSON.stringify({ ...action?.data }))

			return { ...state, authData: action.data, loading: false, errors: null }
		case LOGOUT:
			localStorage.clear()

			return { ...state, authData: null, loading: false, errors: null }
		default:
			return state
	}
}

/* ==========  SELECTORS  =========== */
