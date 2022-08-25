import { checkEmpty } from '../../utils/checkEmpty.ts'

describe('checkEmpty', () => {
	let value

	beforeEach(() => {
		value = null
	})

	it('should check empty', () => {
		value = ' '
		expect(checkEmpty(value)).toBe(false)
		value = 'a'
		expect(checkEmpty(value)).toBe(true)
	})
})
