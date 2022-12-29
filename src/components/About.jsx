import {
	Button,
	Link as ChakraLink,
	HStack,
	Heading,
	Stack,
	Text,
} from '@chakra-ui/react'
import { FaGithub, FaHandSpock } from 'react-icons/fa'

import { CreateGradColor } from '../theme'

const About = () => (
	<Stack
		align='center'
		flexGrow='1'
		h='100%'
		justify='flex-start'
		minH='100vh'
		px={{ sm: '4', md: '10', lg: '16', xl: '24' }}
		py={{ sm: '4', md: '6', lg: '8', xl: '8' }}
	>
		<Stack spacing='4'>
			<HStack justify='center'>
				<Text color='primary.400' fontSize='6xl'>
					<FaHandSpock />
				</Text>
			</HStack>
			<Heading
				as='h2'
				bgClip='text'
				bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
				fontSize='6xl'
				fontWeight='bold'
			>
				Hi, I&apos;m Nacho!
			</Heading>
			<Heading
				as='h3'
				bgClip='text'
				bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
				fontSize='2xl'
				fontWeight='bold'
			>
				And this is Forito ✨
			</Heading>
			<ChakraLink isExternal href='https://github.com/NachoKai/forito'>
				<Button className='button' leftIcon={<FaGithub />} variant='outline' w='100%'>
					Github
				</Button>
			</ChakraLink>
		</Stack>
	</Stack>
)

export default About
