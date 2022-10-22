import { getTopPosts } from '../../utils/getTopPosts'

describe('getTopPosts', () => {
	test('should return top posts', () => {
		const posts = [
			{
				_id: '1',
				likes: ['1', '2', '3'],
			},
			{
				_id: '2',
				likes: ['1', '2'],
			},
			{
				_id: '3',
				likes: ['1', '2', '3', '4', '5'],
			},
			{
				_id: '4',
				likes: ['1'],
			},
			{
				_id: '5',
				likes: [],
			},
		]

		const topPosts = getTopPosts(posts, 5)

		expect(topPosts).toEqual([
			{ _id: '3', likes: ['1', '2', '3', '4', '5'] },
			{ _id: '1', likes: ['1', '2', '3'] },
			{ _id: '2', likes: ['1', '2'] },
			{ _id: '4', likes: ['1'] },
			{ _id: '5', likes: [] },
		])
	})
})
