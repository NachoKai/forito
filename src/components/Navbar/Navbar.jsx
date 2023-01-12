import { Button, Flex, HStack, Heading, useColorMode } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useUser } from '../../hooks/useUser'
import { CreateGradColor } from '../../theme'
import { Form } from '../Form/Form'
import { SearchNavbar } from './SearchNavbar'
import { UserNavbar } from './UserNavbar'
import { NotificationsNavbar } from './NotificationsNavbar'

const Navbar = ({ isOpen, onOpen, onClose }) => {
	const { user, handleLogout } = useUser()
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<Flex
			align='center'
			className={colorMode === 'light' ? 'glassmorphism-light' : 'glassmorphism-dark'}
			flexGrow='1'
			h='70px'
			justify='space-between'
			pos='sticky'
			px={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			top='0'
			zIndex='3'
		>
			<HStack align='center' spacing='4'>
				<Heading
					_hover={{ bgGradient: CreateGradColor('primary', 300, 300, 400, 400) }}
					as='h1'
					bgClip='text'
					bgGradient={CreateGradColor('primary', 300, 900, 100, 400)}
					fontFamily='Roboto Slab'
					fontSize={{ sm: '2xl', md: '2xl', lg: '3xl', xl: '3xl' }}
					fontWeight='bold'
				>
					<Link to='/'>Forito ✨</Link>
				</Heading>
			</HStack>

			<HStack align='center' spacing='4'>
				<SearchNavbar />
				<Form isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
				{user?.result ? (
					<>
						<NotificationsNavbar colorMode={colorMode} />
						<UserNavbar colorMode={colorMode} handleLogout={handleLogout} user={user} />
					</>
				) : (
					<Link to='auth'>
						<Button
							className='button'
							data-cy='navbar-login-button'
							size='sm'
							variant='solid'
						>
							Login
						</Button>
					</Link>
				)}

				<Button p='1' size='sm' variant='ghost' onClick={toggleColorMode}>
					{colorMode === 'light' ? (
						<FaMoon aria-label='Dark Mode' />
					) : (
						<FaSun aria-label='Light Mode' />
					)}
				</Button>
			</HStack>
		</Flex>
	)
}

Navbar.propTypes = {
	isOpen: PropTypes.bool,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
}

export default Navbar
