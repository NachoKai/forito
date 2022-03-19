const checkIsPostCreator = (user, creator) =>
	user?.result?.googleId
		? user?.result?.googleId === creator
		: user?.result?._id
		? user?.result?._id === creator
		: false

export default checkIsPostCreator
