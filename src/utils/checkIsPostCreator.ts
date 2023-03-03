interface UserI {
	result?: {
		_id: string
		googleId?: string
	}
}

export const checkIsPostCreator = (user: UserI, creator: string): boolean => {
	if (!user?.result) return false
	if (user?.result?.googleId) return user.result.googleId === creator
	if (user?.result?._id) return user.result._id === creator

	return false
}
