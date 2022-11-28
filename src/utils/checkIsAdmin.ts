export const checkIsAdmin = (userEmail: string): boolean =>
	userEmail ? import.meta.env.VITE_ADMIN === userEmail : false
