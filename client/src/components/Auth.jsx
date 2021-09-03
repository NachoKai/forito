import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { GoogleLogin } from "react-google-login"
import { Button, Flex, Stack, Text } from "@chakra-ui/react"
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa"

import FormInput from "./common/FormInput"
import { AUTH } from "../redux/auth"
import { login, signup } from "../redux/auth"
import showError from "../utils/showError"
import { createBg } from "../theme"
import { checkEmpty } from "../utils/checkEmpty"

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
}

const Auth = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || null
	const [isSignup, setIsSignup] = useState(false)
	const [formData, setFormData] = useState(initialState)
	const [showPassword, setShowPassword] = useState(false)

	const onSuccess = async res => {
		const result = res?.profileObj
		const token = res?.tokenId

		try {
			dispatch({ type: AUTH, data: { result, token } })

			history.push("/")
		} catch (err) {
			showError("Something went wrong when trying to log in. Please try again.")
			console.error(err)
		}
	}

	const onFailure = res => {
		showError("Something went wrong when trying to log in. Please try again.")
		console.error("Google login was unsuccessful: ", res)
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (isSignup) {
			dispatch(signup(formData, history))
		} else {
			dispatch(login(formData, history))
		}
	}

	const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
	const handleSwitch = () => setIsSignup(prevIsSignup => !prevIsSignup)
	const handleShowPassword = () => setShowPassword(!showPassword)

	return (
		<Stack align="center" justify="flex-start" minHeight="100vh" p="8">
			<Stack
				bg={createBg("primary", 100, 600)}
				borderRadius="lg"
				maxWidth="450px"
				minWidth="320px"
				p="8"
				spacing="4"
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
										value={formData?.firstName}
										onChange={handleChange}
									/>
									<FormInput
										isRequired
										label="Last Name"
										maxLength="25"
										name="lastName"
										value={formData?.lastName}
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
							value={formData?.email}
							onChange={handleChange}
						/>
						<FormInput
							isRequired
							label="Password"
							maxLength="35"
							name="password"
							rightIcon={
								showPassword ? (
									<FaEyeSlash onClick={handleShowPassword} />
								) : (
									<FaEye onClick={handleShowPassword} />
								)
							}
							type={showPassword ? "text" : "password"}
							value={formData?.password}
							onChange={handleChange}
						/>
						{isSignup && (
							<FormInput
								isRequired
								label="Repeat Password"
								maxLength="35"
								name="confirmPassword"
								type="password"
								value={formData?.confirmPassword}
								onChange={handleChange}
							/>
						)}
						<Button
							colorScheme="primary"
							disabled={
								!(isSignup
									? checkEmpty(formData?.firstName) &&
									  checkEmpty(formData?.lastName) &&
									  checkEmpty(formData?.email) &&
									  checkEmpty(formData?.password) &&
									  checkEmpty(formData?.confirmPassword)
									: checkEmpty(formData?.email) && checkEmpty(formData?.password))
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
		</Stack>
	)
}

export default Auth
