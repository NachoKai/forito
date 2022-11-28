import axios from 'axios'

import { isDev } from './utils/checkIsDev'
import { getUserLocalStorage } from './utils/getUserLocalStorage'

export const api = axios.create({
	baseURL: isDev ? 'http://localhost:5000' : import.meta.env.VITE_SERVER_URL,
	timeout: 20_000,
})

api.interceptors.request.use(req => {
	if (localStorage.getItem('forito-profile')) {
		req.headers.authorization = `Bearer ${getUserLocalStorage().token}`
	}

	return req
})
