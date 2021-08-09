export const getUser = () => {
	const user = JSON.parse(localStorage.getItem("forito-profile"))

	return user
}
