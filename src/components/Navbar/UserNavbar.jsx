import {
	Avatar,
	AvatarBadge,
	Divider,
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
import React from 'react'
import PropTypes from 'prop-types'

import { ColorPicker } from './ColorPicker'
import { Link } from 'react-router-dom'

export const UserNavbar = ({ user, handleLogout, colorMode }) => {
	const userId = user?.result?.googleId || user?.result?._id
	const [isDropdownOpen, setIsDropdownOpen] = useBoolean()

	return (
		<HStack align='center' spacing={{ sm: '4', md: '8', lg: '8', xl: '8' }}>
			{Boolean(user?.result?.name) && (
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
								name={user?.result.name}
								referrerPolicy='no-referrer'
								size='sm'
								src={user?.result?.imageUrl}
							>
								<AvatarBadge bg='green.500' boxSize='1em' />
							</Avatar>

							<Text
								data-cy='navbar-username'
								display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
							>
								{user?.result?.name}
							</Text>
						</HStack>
					</PopoverTrigger>
					<PopoverContent className='container'>
						<PopoverCloseButton />
						<PopoverHeader>{user?.result?.name}</PopoverHeader>
						<PopoverBody fontWeight='bold'>
							<Flex justify='space-between'>
								Theme color:
								<ColorPicker />
							</Flex>
						</PopoverBody>
						<Link to={`/creator/${userId}`} onClick={setIsDropdownOpen.off}>
							<PopoverBody
								_hover={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.100' }}
								borderRadius='md'
								cursor='pointer'
								fontWeight='bold'
							>
								My Posts
							</PopoverBody>
						</Link>
						<Link to={`/saved/${userId}`} onClick={setIsDropdownOpen.off}>
							<PopoverBody
								_hover={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.100' }}
								borderRadius='md'
								cursor='pointer'
								fontWeight='bold'
							>
								Saved Posts
							</PopoverBody>
						</Link>
						<Link to={`/settings/${userId}`} onClick={setIsDropdownOpen.off}>
							<PopoverBody
								_hover={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.100' }}
								borderRadius='md'
								cursor='pointer'
								fontWeight='bold'
							>
								Settings
							</PopoverBody>
						</Link>
						<Divider />
						<PopoverBody
							_hover={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.100' }}
							borderRadius='md'
							cursor='pointer'
							fontWeight='bold'
							onClick={handleLogout}
						>
							Logout
						</PopoverBody>
					</PopoverContent>
				</Popover>
			)}
		</HStack>
	)
}

UserNavbar.propTypes = {
	user: PropTypes.object,
	handleLogout: PropTypes.func,
	colorMode: PropTypes.string,
}
