import { Link as ChakraLink, Divider, HStack, Stack, Text } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const GITHUB_URL = 'https://github.com/NachoKai/forito'

const Footer = () => {
	return (
		<Stack
			bg='primary_100_900'
			className='footer'
			color='primary_800_100'
			p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
		>
			<HStack justify='space-between'>
				<HStack spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}>
					<Text fontWeight='bold'>
						<Link to='/'>Home</Link>
					</Text>
					<Text fontWeight='bold'>
						<Link to='about'>About</Link>
					</Text>
					<Text fontWeight='bold'>
						<Link to='search'>Search</Link>
					</Text>
					<Text fontWeight='bold'>
						<Link to='posts/top'>Top Posts</Link>
					</Text>
				</HStack>
				<HStack>
					<ChakraLink isExternal fontSize='xl' href={GITHUB_URL}>
						<Text fontSize='xl'>
							<FaGithub title='Github' />
						</Text>
					</ChakraLink>
				</HStack>
			</HStack>

			<Divider />

			<Stack
				direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}
				justify='space-between'
			>
				<Text fontSize='sm'>
					&#169; {new Date().getFullYear()} Forito. All rights reserved.
				</Text>
				<Text fontSize='sm'>
					Made with ♥️ in 🇦🇷 by{' '}
					<ChakraLink isExternal fontWeight='bold' href={GITHUB_URL}>
						Nacho Caiafa
					</ChakraLink>
				</Text>
			</Stack>
		</Stack>
	)
}

export default Footer
