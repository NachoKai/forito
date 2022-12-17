import {
	Avatar,
	AvatarBadge,
	Flex,
	HStack,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
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
import { v4 as uuid } from 'uuid'

import { displayNotificationType } from '../../utils/displayNotificationType'
import { useNotifications } from '../../hooks/data/auth'
import { getUserLocalStorage } from '../../utils/getUserLocalStorage'

export const NotificationsNavbar = ({ colorMode }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useBoolean()
	const user = getUserLocalStorage()
	const userId = user?.result?.googleId || user?.result?._id
	const { notifications, isSuccess } = useNotifications(userId)
	const notificationsQuantity = notifications?.length
	const hasNotifications = notificationsQuantity > 0
	const lastNotifications =
		isSuccess && [...notifications].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10)

	return (
		<HStack align='center' spacing={{ sm: '4', md: '8', lg: '8', xl: '8' }}>
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
								hasNotifications ? (
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
							{hasNotifications ? (
								<AvatarBadge bg='white' boxSize='1.7em' color='black'>
									{notificationsQuantity}
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
								key={uuid()}
								to={`/posts/${notification?.postId}`}
								onClick={setIsDropdownOpen.off}
							>
								<PopoverBody
									_hover={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.100' }}
									borderRadius='md'
									cursor='pointer'
									fontWeight={notification?.read ? 'normal' : 'bold'}
								>
									<Flex align='center' justify='space-between' spacing='2'>
										<Text pr='8px' w='70%'>
											{notification?.username}{' '}
											{displayNotificationType(notification?.type)}
										</Text>
										<Text fontSize='sm' w='30%'>
											{formatDistance(new Date(), new Date(notification?.createdAt)) +
												' ago'}
										</Text>
									</Flex>
								</PopoverBody>
							</Link>
						))
					) : (
						<PopoverBody>There are no notifications.</PopoverBody>
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
