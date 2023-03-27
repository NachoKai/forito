import axios, { InternalAxiosRequestConfig } from 'axios'

import { UserLocalStorageI } from '../types'
import { isDev } from '../utils/checkIsDev'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'

export const api = axios.create({
	baseURL: isDev ? 'http://localhost:5000' : process.env.REACT_APP_SERVER_URL,
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
