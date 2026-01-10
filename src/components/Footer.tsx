import { Link as ChakraLink, Divider, HStack, Stack, Text } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

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
						<RouterLink to='/'>Home</RouterLink>
					</Text>
					<Text fontWeight='bold'>
						<RouterLink to='about'>About</RouterLink>
					</Text>
					<Text fontWeight='bold'>
						<RouterLink to='search'>Search</RouterLink>
					</Text>
					<Text fontWeight='bold'>
						<RouterLink to='posts/top'>Top Posts</RouterLink>
					</Text>
				</HStack>
				<HStack>
					<ChakraLink isExternal fontSize='xl' href={GITHUB_URL}>
						<Text fontSize='xl'>
							<GithubIcon title='Github' />
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

const RouterLink = styled(Link)`
	&:hover {
		text-decoration: underline;
	}
`

const GithubIcon = styled(FaGithub)`
	&:hover {
		color: #fff;
	}
`
