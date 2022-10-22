import { PostI } from '../types'

export const getTopPosts = (posts: PostI[], max: number) => {
	const sortedPosts = [...posts]?.sort((a, b) => b?.likes?.length - a?.likes?.length)

	return sortedPosts?.slice(0, max)
}
