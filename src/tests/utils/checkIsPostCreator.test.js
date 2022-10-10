import { checkIsPostCreator } from '../../utils/checkIsPostCreator'

describe('checkIsPostCreator', () => {
	let user
	let creator

	beforeEach(() => {
		user = null
		creator = null
	})

	it('should check if its post creator with google id', () => {
		user = {
			result: {
				googleId: 'test',
			},
		}
		creator = 'test'
		expect(checkIsPostCreator(user, creator)).toBe(true)
	})

	it('should check if its not post creator with google id', () => {
		user = {
			result: {
				googleId: 'test',
			},
		}
		creator = 'test2'
		expect(checkIsPostCreator(user, creator)).toBe(false)
	})

	it('should check if its post creator with user id', () => {
		user = {
			result: {
				_id: 'test',
			},
		}
		creator = 'test'
		expect(checkIsPostCreator(user, creator)).toBe(true)
	})

	it('should check if its not post creator with user id', () => {
		user = {
			result: {
				_id: 'test',
			},
		}
		creator = 'test2'
		expect(checkIsPostCreator(user, creator)).toBe(false)
	})
})
