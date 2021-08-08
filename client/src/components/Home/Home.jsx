import { Stack } from "@chakra-ui/react"
import Posts from "../Posts/Posts"
import Form from "../Form/Form"

const Home = ({ currentId, setCurrentId }) => {
	return (
		<Stack
			direction={{ sm: "column-reverse", md: "column-reverse", lg: "row", xl: "row" }}
			p={{ sm: "0", md: "0", lg: "8", xl: "8" }}
			spacing={8}
			w="100%"
		>
			<Stack w="100%">
				<Posts setCurrentId={setCurrentId} />
			</Stack>
			<Stack>
				<Form currentId={currentId} setCurrentId={setCurrentId} />
			</Stack>
		</Stack>
	)
}

export default Home
