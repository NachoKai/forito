import { useRef, useState } from "react"
import { Stack } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"

import Posts from "./Posts"
import Form from "../components/Form"
import Pagination from "./Pagination"
import Search from "./Search"

const useQuery = () => new URLSearchParams(useLocation().search)

const Home = () => {
	const [currentId, setCurrentId] = useState(0)
	const query = useQuery()
	const page = query.get("page") || 1
	const searchQuery = query.get("searchQuery")
	const formRef = useRef(null)

	const handleClick = async () => formRef.current.scrollIntoView({ behavior: "smooth" })

	return (
		<Stack
			direction={{ sm: "column-reverse", md: "column-reverse", lg: "row", xl: "row" }}
			p={{ sm: "0", md: "0", lg: "8", xl: "8" }}
			spacing={8}
		>
			<Stack w="100%">
				<Posts handleClick={handleClick} setCurrentId={setCurrentId} />
			</Stack>
			<Stack spacing="4">
				<div ref={formRef} />
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
