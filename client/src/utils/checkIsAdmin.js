const checkIsAdmin = userEmail =>
	userEmail ? process.env.REACT_APP_ADMIN === userEmail : false

export default checkIsAdmin
