import axios, { InternalAxiosRequestConfig } from 'axios'

import { UserLocalStorageI } from '../types'
import { isDev } from '../utils/checkIsDev'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'

const getBaseURL = () => {
	if (isDev) {
		return 'http://localhost:5000/api'
	}
	const serverUrl = process.env.REACT_APP_SERVER_URL || ''

	// Remove trailing slash if present, then add /api
	return `${serverUrl.replace(/\/$/, '')}/api`
}

export const api = axios.create({
	baseURL: getBaseURL(),
	timeout: 20_000,
})

const profile = localStorage.getItem('forito-profile')
const { token }: UserLocalStorageI = getUserLocalStorage()

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (profile) {
			config.headers.authorization = `Bearer ${token}`
		}

		return Promise.resolve(config)
	},
	error => Promise.reject(error)
)
