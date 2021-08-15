import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Flex, Stack } from "@chakra-ui/react"

import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import { getPosts } from "../../redux/posts"
import Pagination from "../Paginate/Pagination"

const Home = () => {
	const dispatch = useDispatch()
	const [currentId, setCurrentId] = useState(0)

	useEffect(() => {
		dispatch(getPosts())
	}, [currentId, dispatch])

	return (
		<Stack
			direction={{ sm: "column-reverse", md: "column-reverse", lg: "row", xl: "row" }}
			p={{ sm: "0", md: "0", lg: "8", xl: "8" }}
			spacing={8}
		>
			<Stack w="100%">
				<Posts setCurrentId={setCurrentId} />
			</Stack>
			<Stack>
				<Form currentId={currentId} setCurrentId={setCurrentId} />
				<Flex>{/* <Pagination /> */}</Flex>
			</Stack>
		</Stack>
	)
}

export default Home
