import {
	Avatar,
	AvatarBadge,
	Flex,
	HStack,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverHeader,
	PopoverTrigger,
	Text,
	useBoolean,
} from '@chakra-ui/react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdNotificationsActive } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useNotifications, useUpdateNotifications } from '../../hooks/data/auth'
import { calculateLastNotifications } from '../../utils/calculateLastNotifications'
import { displayNotificationType } from '../../utils/displayNotificationType'
import { getUserLocalStorage } from '../../utils/getUserLocalStorage'

export const NotificationsNavbar = ({ colorMode }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useBoolean()
	const user = getUserLocalStorage()
	const userId = user?.result?.googleId || user?.result?._id
	const {
		notifications,
		isSuccess: isNotificationsSuccess,
		count,
		notReadCount,
	} = useNotifications(userId)
	const { mutateAsync: updateNotifications } = useUpdateNotifications()
	const hasNotifications = count > 0
	const hasNotReadNotifications = notReadCount > 0
	const lastNotifications =
		isNotificationsSuccess && calculateLastNotifications(notifications, 5)

	const handleClick = () => {
		if (isNotificationsSuccess) {
			updateNotifications({
				userId,
				notifications: notifications.map(notification => ({
					...notification,
					read: true,
				})),
			})
		}
	}

	return (
		<HStack
			align='center'
			spacing={{ sm: '4', md: '8', lg: '8', xl: '8' }}
			onClick={handleClick}
		>
			<Popover
				isLazy
				closeOnBlur={true}
				isOpen={isDropdownOpen}
				returnFocusOnClose={false}
				onClose={setIsDropdownOpen.off}
				onOpen={setIsDropdownOpen.toggle}
			>
				<PopoverTrigger>
					<HStack align='center' as='button' cursor='pointer'>
						<Avatar
							_hover={{ bg: 'primary_600_300' }}
							bg='primary_500_200'
							icon={
								hasNotReadNotifications ? (
									<MdNotificationsActive
										color={colorMode === 'dark' ? '#000' : '#fff'}
										size='1.5rem'
									/>
								) : (
									<IoMdNotificationsOutline
										color={colorMode === 'dark' ? '#000' : '#fff'}
										size='1.5rem'
									/>
								)
							}
							size='sm'
						>
							{hasNotReadNotifications ? (
								<AvatarBadge bg='white' boxSize='1.7em' color='black'>
									{notReadCount}
								</AvatarBadge>
							) : null}
						</Avatar>
					</HStack>
				</PopoverTrigger>
				<PopoverContent className='container'>
					<PopoverCloseButton />
					<PopoverHeader>Notifications</PopoverHeader>

					{hasNotifications ? (
						lastNotifications?.map(notification => (
							<Link
								key={notification?._id}
								to={`/posts/${notification?.postId}`}
								onClick={setIsDropdownOpen.off}
							>
								<PopoverBody
									_hover={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.100' }}
									borderRadius='md'
									cursor='pointer'
									fontWeight={notification?.read ? 'normal' : 'bold'}
								>
									<Flex align='flex-start' justify='space-between' spacing='2'>
										<Text pr='8px' w='68%'>
											{notification?.username}{' '}
											{displayNotificationType(notification?.type)}
										</Text>
										<Text fontSize='sm' w='28%'>
											{`${formatDistance(
												new Date(),
												new Date(notification?.createdAt)
											)} ago`}
										</Text>
									</Flex>
								</PopoverBody>
							</Link>
						))
					) : (
						<PopoverBody>There are no notifications.</PopoverBody>
					)}

					{count > 0 && (
						<PopoverFooter
							_hover={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.100' }}
							borderRadius='md'
							cursor='pointer'
						>
							<Link to={`/notifications/${userId}`} onClick={setIsDropdownOpen.off}>
								<Text colorScheme='primary' fontWeight='bold' size='sm'>
									See all
								</Text>
							</Link>
						</PopoverFooter>
					)}
				</PopoverContent>
			</Popover>
		</HStack>
	)
}

NotificationsNavbar.propTypes = {
	user: PropTypes.object,
	colorMode: PropTypes.string,
}
