import { Link as ChakraLink, Divider, Stack, Text } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => (
	<Stack
		bg='primary_100_900'
		color='primary_800_100'
		p={{
			sm: '6',
			md: '8',
			lg: '8',
			xl: '8',
		}}
		spacing={{
			sm: '6',
			md: '8',
			lg: '8',
			xl: '8',
		}}
	>
		<Stack direction='row' justify='space-between'>
			<Stack
				direction='row'
				spacing={{
					sm: '6',
					md: '8',
					lg: '8',
					xl: '8',
				}}
			>
				<Text fontWeight='bold'>
					<Link to='/'>Home</Link>
				</Text>
				<Text fontWeight='bold'>
					<Link to='about'>About</Link>
				</Text>
				{/* <Text fontWeight="bold">
						<Link to="top">Top Posts</Link>
					</Text> */}
			</Stack>
			<Stack direction='row'>
				<ChakraLink isExternal fontSize='xl' href='https://github.com/NachoKai/forito'>
					<Text fontSize='xl'>
						<FaGithub />
					</Text>
				</ChakraLink>
			</Stack>
		</Stack>

		<Divider colorScheme='primary' />

		<Stack
			direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}
			justify='space-between'
		>
			<Text fontSize='sm'>
				&#169; {new Date().getFullYear()} Forito. All rights reserved.
			</Text>
			<Text fontSize='sm'>
				Made with &#10084; by{' '}
				<ChakraLink isExternal href='https://github.com/NachoKai/forito'>
					Nacho Caiafa
				</ChakraLink>
			</Text>
		</Stack>
	</Stack>
)

export default Footer
