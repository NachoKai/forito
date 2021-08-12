import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { GoogleLogin } from "react-google-login"
import { Button, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa"

import { refreshTokenSetup } from "../../utils/refreshTokenSetup"
import FormInput from "../common/FormInput"
import { AUTH } from "../../redux/auth"
import { login, signup } from "../../redux/auth"
import showError from "../../utils/showError"
import showSuccess from "../../utils/showSuccess"

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
}

const Auth = () => {
	const bg = useColorModeValue("primary.100", "primary.600")
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
	const dispatch = useDispatch()
	const history = useHistory()
	const [isSignup, setIsSignup] = useState(false)
	const [formData, setFormData] = useState(initialState)
	const [showPassword, setShowPassword] = useState(false)

	const onSuccess = res => {
		const result = res?.profileObj
		const token = res?.tokenId

		try {
			dispatch({ type: AUTH, data: { result, token } })
			history.push("/")
			showSuccess("Successfully logged in.")
		} catch (err) {
			showError("Something went wrong. Please try again.")
			console.error(err)
		}

		refreshTokenSetup(res)
	}

	const onFailure = res => {
		showError("Something went wrong. Please try again.")
		console.error("Google Sign In was unsuccessful. Login failed: ", res)
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (isSignup) {
			dispatch(signup(formData, history))
		} else {
			dispatch(login(formData, history))
		}
	}

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSwitch = () => setIsSignup(prevIsSignup => !prevIsSignup)

	const handleShowPassword = () => setShowPassword(!showPassword)

	return (
		<Flex align="center" h={isSignup ? "90%" : "80%"} justify="center" w="100%">
			<Stack
				bg={bg}
				borderRadius="lg"
				maxWidth="450px"
				minWidth="320px"
				p="8"
				spacing={4}
				w="100%"
			>
				<Text fontSize="xl" fontWeight="bold">
					{isSignup ? "Sign Up" : "Login"}
				</Text>
				<form onSubmit={handleSubmit}>
					<Stack spacing="2">
						{isSignup && (
							<>
								<Stack direction="row" spacing="2">
									<FormInput
										autoFocus
										isRequired
										label="First Name"
										maxLength="25"
										name="firstName"
										value={formData.firstName}
										onChange={handleChange}
									/>
									<FormInput
										isRequired
										label="Last Name"
										maxLength="25"
										name="lastName"
										value={formData.lastName}
										onChange={handleChange}
									/>
								</Stack>
							</>
						)}
						<FormInput
							isRequired
							label="Email"
							maxLength="35"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
						/>
						<FormInput
							isRequired
							label="Password"
							maxLength="35"
							name="password"
							rightIcon={
								showPassword ? (
									<FaEye onClick={handleShowPassword} />
								) : (
									<FaEyeSlash onClick={handleShowPassword} />
								)
							}
							type={showPassword ? "text" : "password"}
							value={formData.password}
							onChange={handleChange}
						/>
						{isSignup && (
							<FormInput
								isRequired
								label="Repeat Password"
								maxLength="35"
								name="confirmPassword"
								type="password"
								value={formData.confirmPassword}
								onChange={handleChange}
							/>
						)}
						<Button
							colorScheme="primary"
							disabled={
								!(isSignup
									? formData.firstName.trim().length > 0 &&
									  formData.lastName.trim().length > 0 &&
									  formData.email.trim().length > 0 &&
									  formData.password.trim().length > 0 &&
									  formData.confirmPassword.trim().length > 0
									: formData.email.trim().length > 0 &&
									  formData.password.trim().length > 0)
							}
							type="submit"
							variant="solid"
						>
							{isSignup ? "Sign Up" : "Login"}
						</Button>
					</Stack>
				</form>

				<Text align="center" fontWeight="bold">
					or
				</Text>

				<GoogleLogin
					clientId={clientId}
					cookiePolicy={"single_host_origin"}
					render={({ disabled, onClick }) => (
						<Button
							colorScheme="primary"
							disabled={disabled}
							leftIcon={<FaGoogle />}
							size="lg"
							variant="outline"
							onClick={onClick}
						>
							Google Login
						</Button>
					)}
					onFailure={onFailure}
					onSuccess={onSuccess}
				/>

				<Flex justify="flex-end">
					<Button colorScheme="primary" size="xs" variant="ghost" onClick={handleSwitch}>
						{isSignup
							? "Already have an account? Login"
							: "Don't have an account? Sign up"}
					</Button>
				</Flex>
			</Stack>
		</Flex>
	)
}

export default Auth
