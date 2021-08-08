import { Flex, Text, Stack, useColorModeValue, Button } from "@chakra-ui/react"
import { GoogleLogin } from "react-google-login"
import { FaGoogle } from "react-icons/fa"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AUTH } from "../../redux/auth"
import { refreshTokenSetup } from "../../utils/refreshTokenSetup"
import FormInput from "../common/FormInput"
import { useState } from "react"

const Auth = () => {
	const bg = useColorModeValue("primary.100", "primary.600")
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
	const dispatch = useDispatch()
	const history = useHistory()
	const [isSignup, setIsSignup] = useState(false)

	const onSuccess = res => {
		const result = res?.profileObj
		const token = res?.tokenId

		try {
			dispatch({ type: AUTH, data: { result, token } })
			history.push("/")
		} catch (err) {
			console.error(err)
		}

		refreshTokenSetup(res)
	}

	const onFailure = res => {
		console.error("Google Sign In was unsuccessful. Please try again.")
		console.error("Login failed: ", res)
	}

	const handleSubmit = () => {}

	const handleChange = () => {}

	const handleSwitch = () => setIsSignup(prevIsSignup => !prevIsSignup)

	return (
		<Flex align="center" h={isSignup ? "90%" : "80%"} justify="center" w="100%">
			<Stack bg={bg} borderRadius="lg" maxWidth="450px" minWidth="320px" p="8" spacing={4} w="100%">
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
										handleChange={handleChange}
										label="First Name"
										maxLength="55"
										name="firstName"
										value={""}
									/>
									<FormInput
										isRequired
										handleChange={handleChange}
										label="Last Name"
										maxLength="55"
										name="lastName"
										value={""}
									/>
								</Stack>
							</>
						)}
						<FormInput
							isRequired
							handleChange={handleChange}
							label="Email"
							maxLength="55"
							name="email"
							type="email"
							value={""}
						/>
						<FormInput
							isRequired
							handleChange={handleChange}
							label="Password"
							maxLength="55"
							name="password"
							type="password"
							value={""}
						/>
						{isSignup && (
							<FormInput
								isRequired
								handleChange={handleChange}
								label="Repeat Password"
								maxLength="55"
								name="repeatPassword"
								type="password"
								value={""}
							/>
						)}
						<Button colorScheme="primary" type="submit" variant="solid">
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
							{isSignup ? "Google Sign Up" : "Google Login"}
						</Button>
					)}
					onFailure={onFailure}
					onSuccess={onSuccess}
				/>

				<Flex justify="flex-end">
					<Button colorScheme="primary" size="xs" variant="ghost" onClick={handleSwitch}>
						{isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
					</Button>
				</Flex>
			</Stack>
		</Flex>
	)
}

export default Auth
