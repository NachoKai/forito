import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AUTH, login, signup } from '../redux/auth'
import { checkEmpty } from '../utils/checkEmpty.ts'
import getThemeColor from '../utils/getThemeColor.ts'
import showError from '../utils/showError.ts'
import FormInput from './common/FormInput'

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const Auth = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || null
	const [isSignup, setIsSignup] = useState(false)
	const [formData, setFormData] = useState(initialState)
	const [showPassword, setShowPassword] = useState(false)
	const isSubmitDisabled = !(isSignup
		? checkEmpty(formData?.firstName) &&
		  checkEmpty(formData?.email) &&
		  checkEmpty(formData?.password) &&
		  checkEmpty(formData?.confirmPassword)
		: checkEmpty(formData?.email) && checkEmpty(formData?.password))

	const onSuccess = res => {
		const result = res?.profileObj
		const token = res?.tokenId

		try {
			dispatch({ type: AUTH, data: { result, token } })
			navigate('/')
		} catch (err) {
			showError('Something went wrong when trying to log in. Please try again.')
			console.error(err)
		}
	}

	const onFailure = res => {
		showError('Something went wrong when trying to log in. Please try again.')
		console.error('Google login was unsuccessful: ', res)
	}

	const handleSubmit = e => {
		try {
			e.preventDefault()
			if (isSignup) dispatch(signup(formData, navigate))
			else dispatch(login(formData, navigate))
		} catch (error) {
			showError('Something went wrong when trying to log in. Please try again.')
			console.error(error)
			throw error
		}
	}

	const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

	const handleSwitch = () => setIsSignup(prevIsSignup => !prevIsSignup)

	const handleShowPassword = () => setShowPassword(!showPassword)

	return (
		<Stack
			align='center'
			justify='flex-start'
			minHeight='100vh'
			px={{ sm: '4', md: '10', lg: '16', xl: '24' }}
			py={{ sm: '4', md: '6', lg: '8', xl: '8' }}
		>
			<Stack
				bg='primary_100_600'
				borderRadius='24px'
				maxWidth='450px'
				minWidth='320px'
				p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
				spacing='4'
				w='100%'
			>
				<Text fontSize='xl' fontWeight='bold'>
					{isSignup ? 'Sign Up' : 'Login'}
				</Text>
				<form onSubmit={handleSubmit}>
					<Stack spacing='2'>
						{!!isSignup && (
							<Stack direction='row' spacing='2'>
								<FormInput
									autoFocus
									isRequired
									dataCy='auth-first-name'
									label='First Name'
									maxLength='25'
									name='firstName'
									tooltip='Required'
									value={formData?.firstName}
									onChange={handleChange}
								/>
								<FormInput
									dataCy='auth-last-name'
									label='Last Name'
									maxLength='25'
									name='lastName'
									value={formData?.lastName}
									onChange={handleChange}
								/>
							</Stack>
						)}
						<FormInput
							isRequired
							dataCy='auth-email'
							label='Email'
							maxLength='35'
							name='email'
							tooltip='Required'
							type='email'
							value={formData?.email}
							onChange={handleChange}
						/>
						<FormInput
							isRequired
							dataCy='auth-password'
							label='Password'
							maxLength='35'
							name='password'
							rightIcon={
								showPassword ? (
									<FaEyeSlash onClick={handleShowPassword} />
								) : (
									<FaEye onClick={handleShowPassword} />
								)
							}
							tooltip='Required'
							type={showPassword ? 'text' : 'password'}
							value={formData?.password}
							onChange={handleChange}
						/>
						{!!isSignup && (
							<FormInput
								isRequired
								dataCy='auth-confirm-password'
								label='Repeat Password'
								maxLength='35'
								name='confirmPassword'
								tooltip='Required'
								type='password'
								value={formData?.confirmPassword}
								onChange={handleChange}
							/>
						)}
						<Button
							boxShadow={() => getThemeColor()}
							data-cy='auth-login-signup-button'
							disabled={isSubmitDisabled}
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
					<Button size='sm' variant='ghost' onClick={handleSwitch}>
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
