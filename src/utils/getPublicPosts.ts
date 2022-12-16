import { checkIsPostCreator } from './checkIsPostCreator'
import { PostI, UserI } from '../types'
import { getUserLocalStorage } from './getUserLocalStorage'
import { checkIsAdmin } from './checkIsAdmin'

export const getPublicPosts = (posts: PostI[]) => {
	const user: UserI = getUserLocalStorage()
	const userEmail = user?.result?.email
	const isAdmin = checkIsAdmin(userEmail)

	return posts?.filter((post: PostI) => {
		const isPrivate = post?.privacy === 'private'
		const creator = post?.creator
		const isPostCreator = checkIsPostCreator(user, creator)

		return !isPrivate || (isPrivate && isPostCreator) || isAdmin
	})
}
