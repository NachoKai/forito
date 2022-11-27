import { Stack, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

import { getUserLocalStorage } from '../../utils/getUserLocalStorage'
import { ChangeBirthday } from './ChangeBirthday'
import { ChangeEmail } from './ChangeEmail'
import { ChangeName } from './ChangeName'
import { ChangePassword } from './ChangePassword'

const Settings = () => {
	const location = useLocation()
	const pathname = location.pathname
	const selectedId = pathname.split('/')?.[2]
	const user = getUserLocalStorage()
	const _id = user?.result?._id

	if (selectedId !== _id) return null

	return (
		<Stack
			align='center'
			justify='flex-start'
			minH='100vh'
			px={{ sm: '4', md: '10', lg: '16', xl: '24' }}
			py={{ sm: '4', md: '6', lg: '8', xl: '8' }}
		>
			<Stack
				bg='primary_100_600'
				borderRadius='24px'
				className='container'
				maxW='500px'
				minW='320px'
				p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
				spacing='4'
				w='100%'
			>
				<Text fontSize='xl' fontWeight='bold'>
					Settings (under construction)
				</Text>

				<ChangeName />
				<ChangeBirthday />
				<ChangeEmail />
				<ChangePassword />
			</Stack>
		</Stack>
	)
}

export default Settings
