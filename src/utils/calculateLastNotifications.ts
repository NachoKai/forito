import { NotificationI } from '../types'

export const calculateLastNotifications = (
	notifications: NotificationI[],
	quantity: number
) =>
	[...notifications]
		.sort(
			(a: NotificationI, b: NotificationI) =>
				new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
		)
		.slice(0, quantity || 5)
