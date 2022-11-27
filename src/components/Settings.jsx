import { Button, HStack, Stack, Text, useBoolean } from '@chakra-ui/react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { FormInput } from './common/FormInput'

const Settings = () => {
	const [showOldPassword, setShowOldPassword] = useBoolean()
	const [showNewPassword, setShowNewPassword] = useBoolean()
	const [showConfirmPassword, setShowConfirmPassword] = useBoolean()
	const [loading, setLoading] = useBoolean()

	const handleSubmit = () => {
		setLoading.on()

		return
	}

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
				<form onSubmit={handleSubmit}>
					<Stack spacing='4'>
						<HStack spacing='4'>
							<FormInput
								autoFocus
								dataCy='settings-change-first-name'
								label='Change first name'
								maxLength='25'
								name='change-firstName'
								tooltip='Required'
							/>
							<FormInput
								dataCy='settings-change-last-name'
								label='Change last name'
								maxLength='25'
								name='change-lastName'
							/>
						</HStack>
						<FormInput
							dataCy='settings-change-email'
							label='Change email'
							maxLength='35'
							name='change-email'
							tooltip='Required'
							type='email'
						/>
						<FormInput
							isRequired
							dataCy='settings-change-password'
							label='Change password'
							maxLength='35'
							name='change-password'
							rightIcon={
								showNewPassword ? (
									<FaEyeSlash onClick={setShowNewPassword.toggle} />
								) : (
									<FaEye onClick={setShowNewPassword.toggle} />
								)
							}
							tooltip='Required'
							type={showNewPassword ? 'text' : 'password'}
						/>
						<FormInput
							isRequired
							dataCy='settings-confirm-password'
							label='Confirm new password'
							maxLength='35'
							name='confirm-new-password'
							rightIcon={
								showConfirmPassword ? (
									<FaEyeSlash onClick={setShowConfirmPassword.toggle} />
								) : (
									<FaEye onClick={setShowConfirmPassword.toggle} />
								)
							}
							tooltip='Required'
							type={showConfirmPassword ? 'text' : 'password'}
						/>
						<FormInput
							isRequired
							dataCy='settings-old-password'
							label='Old password'
							maxLength='35'
							name='old-password'
							rightIcon={
								showOldPassword ? (
									<FaEyeSlash onClick={setShowOldPassword.toggle} />
								) : (
									<FaEye onClick={setShowOldPassword.toggle} />
								)
							}
							tooltip='Required'
							type={showOldPassword ? 'text' : 'password'}
						/>

						<Button
							className='button'
							data-cy='auth-login-signup-button'
							disabled={Boolean(loading)}
							isLoading={Boolean(loading)}
							loadingText='Loading...'
							type='submit'
							variant='solid'
						>
							Confirm
						</Button>
					</Stack>
				</form>
			</Stack>
		</Stack>
	)
}

export default Settings
