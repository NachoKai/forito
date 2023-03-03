export const checkIsAdmin = (userEmail: string): boolean => {
	if (!userEmail || !process.env.REACT_APP_ADMIN) return false

	return process.env.REACT_APP_ADMIN === userEmail
}
