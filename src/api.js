import axios from 'axios'

import { isDev } from './utils/checkIsDev.ts'
import { getUserLocalStorage } from './utils/getUserLocalStorage.ts'

export const api = axios.create({
	baseURL: isDev ? 'http://localhost:5000' : process.env.REACT_APP_SERVER_URL,
	timeout: 20_000,
})

api.interceptors.request.use(req => {
	if (localStorage.getItem('forito-profile')) {
		req.headers.authorization = `Bearer ${getUserLocalStorage().token}`
	}

	return req
})
