import { Button, Flex, HStack, Stack, Text, useBoolean } from '@chakra-ui/react'
import { GoogleLogin } from 'react-google-login'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '../state/authStore'
import { showError } from '../utils/showError'
import { FormInput } from './common/FormInput'

const Auth = () => {
	const { login, signup, googleLogin } = useAuthStore()
	const navigate = useNavigate()
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || null
	const [isSignup, setIsSignup] = useBoolean()
	const [showPassword, setShowPassword] = useBoolean()
	const [showRepeatPassword, setShowRepeatPassword] = useBoolean()
	const [loading, setLoading] = useBoolean()

	const onSuccess = async res => {
		try {
			setLoading.on()
			const result = res?.profileObj
			const token = res?.tokenId

			await googleLogin({ result, token })
			navigate('/posts')
		} catch (err) {
			showError(
				<>
					<Text fontWeight='bold'>{err.name}</Text>
					<Text>Something went wrong when trying to log in. {err.message}</Text>
					<Text>Please try again.</Text>
				</>
			)
			console.error(err)
		} finally {
			setLoading.off()
		}
	}

	const onFailure = res => {
		showError(
			<>
				<Text>Something went wrong when trying to log in. </Text>
				<Text>Please try again.</Text>
			</>
		)
		console.error('Google login was unsuccessful: ', res)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		e.stopPropagation()

		try {
			if (isSignup) {
				setLoading.on()
				await signup({
					firstName: e.target.firstName.value,
					lastName: e.target.lastName.value,
					email: e.target.email.value,
					password: e.target.password.value,
					confirmPassword: e.target.confirmPassword.value,
				})
			} else {
				setLoading.on()
				await login({
					email: e.target.email.value,
					password: e.target.password.value,
				})
			}
			setLoading.off()
			navigate('/posts')
		} catch (err) {
			showError(
				<>
					<Text fontWeight='bold'>{err.name}</Text>
					<Text>Something went wrong when trying to log in. {err.message}</Text>
					<Text>Please try again.</Text>
				</>
			)
			console.error(err)
			throw err
		}
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
					{isSignup ? 'Sign Up' : 'Login'}
				</Text>
				<form onSubmit={handleSubmit}>
					<Stack spacing='4'>
						{Boolean(isSignup) && (
							<HStack spacing='4'>
								<FormInput
									autoFocus
									isRequired
									dataCy='auth-first-name'
									label='First Name'
									maxLength='25'
									minLength='2'
									name='firstName'
									tooltip='Required'
								/>
								<FormInput
									dataCy='auth-last-name'
									label='Last Name'
									maxLength='25'
									name='lastName'
								/>
							</HStack>
						)}
						<FormInput
							isRequired
							dataCy='auth-email'
							label='Email'
							maxLength='35'
							minLength='7'
							name='email'
							tooltip='Required'
							type='email'
						/>
						<FormInput
							isRequired
							dataCy='auth-password'
							errorBorderColor='red.300'
							label='Password'
							maxLength='35'
							minLength='6'
							name='password'
							rightIcon={
								showPassword ? (
									<FaEyeSlash onClick={setShowPassword.toggle} />
								) : (
									<FaEye onClick={setShowPassword.toggle} />
								)
							}
							tooltip='Required'
							type={showPassword ? 'text' : 'password'}
						/>
						{Boolean(isSignup) && (
							<FormInput
								isRequired
								dataCy='auth-confirm-password'
								errorBorderColor='red.300'
								label='Repeat Password'
								maxLength='35'
								minLength='6'
								name='confirmPassword'
								rightIcon={
									showRepeatPassword ? (
										<FaEyeSlash onClick={setShowRepeatPassword.toggle} />
									) : (
										<FaEye onClick={setShowRepeatPassword.toggle} />
									)
								}
								tooltip='Required'
								type={showRepeatPassword ? 'text' : 'password'}
							/>
						)}
						<Button
							className='button'
							data-cy='auth-login-signup-button'
							disabled={Boolean(loading)}
							isLoading={Boolean(loading)}
							loadingText='Loading...'
							type='submit'
							variant='solid'
						>
							{isSignup ? 'Sign Up' : 'Login'}
						</Button>
					</Stack>
				</form>

				<Text align='center' fontWeight='bold'>
					or
				</Text>

				<GoogleLogin
					clientId={clientId}
					cookiePolicy={'single_host_origin'}
					render={({ disabled, onClick }) => (
						<Button
							className={disabled ? '' : 'button'}
							data-cy='auth-google-login-signup'
							disabled={disabled}
							leftIcon={<FaGoogle />}
							size='lg'
							variant='outline'
							onClick={onClick}
						>
							Google Login
						</Button>
					)}
					onFailure={onFailure}
					onSuccess={onSuccess}
				/>

				<Flex justify='flex-end'>
					<Button size='sm' variant='ghost' onClick={setIsSignup.toggle}>
						{isSignup
							? 'Already have an account? Login'
							: "Don't have an account? Sign up"}
					</Button>
				</Flex>
			</Stack>
		</Stack>
	)
}

export default Auth
