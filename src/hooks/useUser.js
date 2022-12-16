import decode from 'jwt-decode'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import { useLogout } from './data/auth'

export const useUser = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { mutateAsync: logout } = useLogout()
	const [user, setUser] = useState(() => getUserLocalStorage())

	const handleLogout = useCallback(async () => {
		setUser(null)
		await logout()
		navigate('/', { replace: true })
		navigate(0)
	}, [logout, navigate])

	useEffect(() => {
		const token = user?.token

		if (token && decode(token).exp * 1000 < new Date().getTime()) handleLogout()
		setUser(getUserLocalStorage())
	}, [handleLogout, location, user?.token])

	return { user, handleLogout }
}
