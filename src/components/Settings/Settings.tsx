import { HStack, Stack, Text } from '@chakra-ui/react'
import { format, isValid } from 'date-fns'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { UserLocalStorageI } from '../../types'
import { ChangeBirthday } from './ChangeBirthday'
import { ChangeEmail } from './ChangeEmail'
import { ChangeName } from './ChangeName'
import { ChangePassword } from './ChangePassword'

const DATE_FORMAT = 'dd/MM/yyyy'

interface SettingsProps {
	user: UserLocalStorageI
}

const Settings = ({ user }: SettingsProps) => {
	const navigate = useNavigate()
	const location = useLocation()
	const pathname = location.pathname
	const selectedId = pathname.split('/')?.[2]
	const userName = user?.result?.name
	const userEmail = user?.result?.email
	const userBirthday = isValid(new Date(user?.result?.birthday || ''))
		? new Date(user?.result?.birthday || '')
		: null
	const formattedBirthday = userBirthday && format(userBirthday, DATE_FORMAT)
	const userGoogleId = user?.result?.googleId
	const userId = user?.result?._id

	useEffect(() => {
		if (userGoogleId) {
			if (selectedId !== userGoogleId) {
				navigate(`/settings/${userGoogleId}`)
			}
		} else if (selectedId !== userId) {
			navigate(`/settings/${userId}`)
		}
	}, [navigate, selectedId, userGoogleId, userId])

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
					Settings
				</Text>

				<Stack spacing='2'>
					<HStack spacing='2'>
						<Text fontWeight='bold'>Name:</Text>
						<Text>{userName}</Text>
					</HStack>
					<HStack spacing='2'>
						<Text fontWeight='bold'>Email:</Text>
						<Text>{userEmail}</Text>
					</HStack>
					<HStack spacing='2'>
						<Text fontWeight='bold'>Birthday:</Text>
						<Text>{formattedBirthday}</Text>
					</HStack>
				</Stack>

				{userGoogleId ? (
					<Text fontSize='md' mt='4'>
						You can&apos;t change your settings because you signed up with Google.
					</Text>
				) : (
					<>
						<ChangeName />
						<ChangeEmail />
						<ChangeBirthday />
						<ChangePassword />
					</>
				)}
			</Stack>
		</Stack>
	)
}

export default Settings
