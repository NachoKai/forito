import { useState } from "react"
import { Stack } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"

import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import Pagination from "../Paginate/Pagination"
import Search from "./Search"

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

const Home = () => {
	const [currentId, setCurrentId] = useState(0)
	const query = useQuery()
	const page = query.get("page") || 1
	const searchQuery = query.get("searchQuery")

	return (
		<Stack
			direction={{ sm: "column", md: "column", lg: "row", xl: "row" }}
			p={{ sm: "0", md: "0", lg: "8", xl: "8" }}
			spacing={8}
		>
			<Stack w="100%">
				<Posts setCurrentId={setCurrentId} />
			</Stack>
			<Stack spacing="4">
				<Form currentId={currentId} setCurrentId={setCurrentId} />
				<Stack spacing="4">
					{!searchQuery && <Pagination page={page} />}
					<Search />
				</Stack>
			</Stack>
		</Stack>
	)
}

export default Home
