import { Flex, Text, Stack, useColorModeValue, Button } from "@chakra-ui/react"
import { GoogleLogin } from "react-google-login"
import { FaGoogle } from "react-icons/fa"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AUTH } from "../../redux/auth"
import { refreshTokenSetup } from "../../utils/refreshTokenSetup"

const Auth = () => {
	const bg = useColorModeValue("primary.100", "primary.600")
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
	const dispatch = useDispatch()
	const history = useHistory()

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
		console.error("Login failed: res:", res)
		alert("Google Sign In was unsuccessful. Please try again.")
	}

	return (
		<Flex align="center" h="50%" justify="center" w="100%">
			<Stack bg={bg} borderRadius="lg" maxWidth="450px" minWidth="320px" p="8" spacing={4} w="100%">
				<Text fontSize="xl" fontWeight="bold">
					Login
				</Text>
				<GoogleLogin
					clientId={clientId}
					cookiePolicy={"single_host_origin"}
					render={({ disabled, onClick }) => (
						<Button
							colorScheme="primary"
							disabled={disabled}
							leftIcon={<FaGoogle />}
							variant="solid"
							onClick={onClick}
						>
							Google Sign In
						</Button>
					)}
					onFailure={onFailure}
					onSuccess={onSuccess}
				/>
			</Stack>
		</Flex>
	)
}

export default Auth
