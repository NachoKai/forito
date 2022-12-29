import { calculateLastNotifications } from '../../utils/calculateLastNotifications'

describe('calculateLastNotifications', () => {
	let notifications
	let quantity

	beforeEach(() => {
		notifications = null
		quantity = null
	})

	it('should calculate last 3 notifications', () => {
		notifications = [
			{
				_id: '1',
				createdAt: '2021-02-04T20:00:00.000Z',
				read: false,
			},
			{
				_id: '2',
				createdAt: '2021-02-07T17:00:00.000Z',
				read: false,
			},
			{
				_id: '3',
				createdAt: '2021-02-03T16:00:00.000Z',
				read: false,
			},
			{
				_id: '4',
				createdAt: '2021-02-08T19:00:00.000Z',
				read: false,
			},
		]
		quantity = 3

		const result = calculateLastNotifications(notifications, quantity)

		expect(result).toHaveLength(3)
		expect(result[0]._id).toBe('4')
		expect(result[1]._id).toBe('2')
		expect(result[2]._id).toBe('1')
	})
})
