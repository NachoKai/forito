import { calculateValidTags } from '../../utils/calculateValidTags'

// const regEx = /^[a-zA-Z0-9_.-]*$/
// export const calculateValidTags = (tags: string[]) =>
// 	![...new Set(tags)].every(tag => regEx.test(tag))

describe('calculateValidTags', () => {
	let tags

	beforeEach(() => {
		tags = null
	})

	it('should calculate valid tags', () => {
		tags = ['hello']
		expect(calculateValidTags(tags)).toBe(true)
		tags = ['hello123']
		expect(calculateValidTags(tags)).toBe(true)
		tags = ['hello_world']
		expect(calculateValidTags(tags)).toBe(true)
		tags = ['hello-world']
		expect(calculateValidTags(tags)).toBe(true)
		tags = ['hello.world']
		expect(calculateValidTags(tags)).toBe(true)
		tags = ['123']
		expect(calculateValidTags(tags)).toBe(true)
	})

	it('should calculate invalid tags', () => {
		tags = ['hello world']
		expect(calculateValidTags(tags)).toBe(false)
		tags = ['hello@world']
		expect(calculateValidTags(tags)).toBe(false)
		tags = ['hello%world']
		expect(calculateValidTags(tags)).toBe(false)
		tags = ['héllo']
		expect(calculateValidTags(tags)).toBe(false)
	})
})
