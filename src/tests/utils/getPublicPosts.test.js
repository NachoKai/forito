import { getPublicPosts } from '../../utils/getPublicPosts'

describe('getPublicPosts', () => {
	let posts

	beforeEach(() => {
		posts = null
	})

	it('should get public posts', () => {
		posts = [
			{
				_id: '1',
				title: 'post 1',
				privacy: 'public',
				creator: '123',
			},
			{
				_id: '2',
				title: 'post 2',
				privacy: 'public',
				creator: '123',
			},
			{
				_id: '3',
				title: 'post 3',
				privacy: 'public',
				creator: '123',
			},
		]

		const result = getPublicPosts(posts)

		expect(result).toEqual(posts)
	})

	it('should not get private posts', () => {
		posts = [
			{
				_id: '1',
				title: 'post 1',
				privacy: 'private',
				creator: '123',
			},
			{
				_id: '2',
				title: 'post 2',
				privacy: 'private',
				creator: '123',
			},
			{
				_id: '3',
				title: 'post 3',
				privacy: 'private',
				creator: '123',
			},
		]

		const result = getPublicPosts(posts)

		expect(result).toEqual([])
	})
})
