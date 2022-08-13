interface UserI {
	result?: {
		_id: string
		googleId?: string
	}
}

const checkIsPostCreator = (user: UserI, creator: string): boolean =>
	user?.result?.googleId
		? user?.result?.googleId === creator
		: user?.result?._id
		? user?.result?._id === creator
		: false

export default checkIsPostCreator
