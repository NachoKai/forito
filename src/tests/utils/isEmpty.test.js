import { isEmpty } from '../../utils/isEmpty'

describe('isEmpty', () => {
	let value

	beforeEach(() => {
		value = null
	})

	it('should check if object is empty', () => {
		value = {}
		expect(isEmpty(value)).toBe(true)
	})

	it('should check if object is not empty', () => {
		value = { name: 'John Doe' }
		expect(isEmpty(value)).toBe(false)
	})

	it('should check if string is empty', () => {
		value = ''
		expect(isEmpty(value)).toBe(true)
	})

	it('should check if string is not empty', () => {
		value = 'John Doe'
		expect(isEmpty(value)).toBe(false)
	})

	it('should check if undefined is empty', () => {
		value = undefined
		expect(isEmpty(value)).toBe(true)
	})

	it('should check if null is empty', () => {
		value = null
		expect(isEmpty(value)).toBe(true)
	})
})
