import axios from 'axios'

import { isDev } from '../utils/checkIsDev'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'

export const api = axios.create({
	baseURL: isDev ? 'http://localhost:5000' : process.env.REACT_APP_SERVER_URL,
	timeout: 20_000,
})

const profile = localStorage.getItem('forito-profile')
const authToken = getUserLocalStorage().token

api.interceptors.request.use(req => {
	if (profile) req.headers.authorization = `Bearer ${authToken}`

	return req
})
