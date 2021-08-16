import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Button, Flex, Stack } from "@chakra-ui/react"
import { useHistory, useLocation } from "react-router-dom"
import ChipInput from "material-ui-chip-input"
import styled from "styled-components"

import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import { getPosts, getPostsBySearch } from "../../redux/posts"
import Pagination from "../Paginate/Pagination"
import FormInput from "../common/FormInput"
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
			direction={{ sm: "column-reverse", md: "column-reverse", lg: "row", xl: "row" }}
			p={{ sm: "0", md: "0", lg: "8", xl: "8" }}
			spacing={8}
		>
			<Stack w="100%">
				<Posts setCurrentId={setCurrentId} />
			</Stack>
			<Stack>
				<Search />
				<Form currentId={currentId} setCurrentId={setCurrentId} />
				<Flex>
					<Pagination page={page} />
				</Flex>
			</Stack>
		</Stack>
	)
}

export default Home
