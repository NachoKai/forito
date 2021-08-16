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

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

const Home = () => {
	const dispatch = useDispatch()
	const [currentId, setCurrentId] = useState(0)
	const query = useQuery()
	const history = useHistory()
	const page = query.get("page") || 1
	const searchQuery = query.get("searchQuery")
	const [searchValue, setSearchValue] = useState("")
	const [searchTags, setSearchTags] = useState([])

	const searchPost = () => {
		if (searchValue.trim() || searchTags) {
			dispatch(getPostsBySearch({ search: searchValue, tags: searchTags.join(",") }))
			history.push(
				`/posts/search?searchQuery=${searchValue || "none"}&tags=${searchTags.join(",")}`
			)
		} else {
			history.push("/")
		}
	}

	const handleKeyPress = e => {
		if (e.keyCode === 188 || e.keyCode === 13) {
			searchPost()
		}
	}

	const handleAddTag = tag => setSearchTags([...searchTags, tag])
	const handleDeleteTag = tagToDelete =>
		setSearchTags(searchTags.filter(tag => tag !== tagToDelete))

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
				<FormInput
					label="Search Posts"
					maxLength="105"
					name="search"
					value={searchValue}
					onChange={e => {
						setSearchValue(e.target.value)
					}}
					onKeyPress={handleKeyPress}
				/>
				<TagsContainer>
					<ChipInput
						label="Search Tags"
						value={searchTags}
						onAdd={tag => handleAddTag(tag)}
						onDelete={tag => handleDeleteTag(tag)}
					/>
				</TagsContainer>
				<Button colorScheme="primary" onClick={searchPost}>
					Search
				</Button>

				<Form currentId={currentId} setCurrentId={setCurrentId} />
				<Flex>
					<Pagination page={page} />
				</Flex>
			</Stack>
		</Stack>
	)
}

export default Home

const TagsContainer = styled(Flex)`
	background: white;
	color: black;
`
