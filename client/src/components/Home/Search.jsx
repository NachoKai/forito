// import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { Button, Flex } from "@chakra-ui/react"
// import { useHistory } from "react-router-dom"
// import ChipInput from "material-ui-chip-input"
// import styled from "styled-components"

// import { getPostsBySearch } from "../../redux/posts"
// import FormInput from "../common/FormInput"

// const Search = ({ searchTags, setSearchTags }) => {
// 	const dispatch = useDispatch()
// 	const history = useHistory()
// 	const [searchValue, setSearchValue] = useState("")

// 	const searchPost = () => {
// 		if (searchValue.trim() || searchTags) {
// 			dispatch(getPostsBySearch({ search: searchValue, tags: searchTags.join(",") }))
// 			history.push(
// 				`/posts/search?searchQuery=${searchValue || "none"}&tags=${searchTags.join(",")}`
// 			)
// 		} else {
// 			history.push("/")
// 		}
// 	}

// 	const handleKeyPress = e => {
// 		if (e.keyCode === 188 || e.keyCode === 13) {
// 			searchPost()
// 		}
// 	}

// 	const handleAddTag = tag => setSearchTags([...searchTags, tag])
// 	const handleDeleteTag = tagToDelete =>
// 		setSearchTags(searchTags.filter(tag => tag !== tagToDelete))

// 	return (
// 		<>
// 			<FormInput
// 				label="Search Posts"
// 				maxLength="105"
// 				name="search"
// 				value={searchValue}
// 				onChange={e => {
// 					setSearchValue(e.target.value)
// 				}}
// 				onKeyPress={handleKeyPress}
// 			/>
// 			<TagsContainer>
// 				<ChipInput
// 					label="Search Tags"
// 					value={searchTags}
// 					onAdd={tag => handleAddTag(tag)}
// 					onDelete={tag => handleDeleteTag(tag)}
// 				/>
// 			</TagsContainer>
// 			<Button colorScheme="primary" onClick={searchPost}>
// 				Search
// 			</Button>
// 		</>
// 	)
// }

// export default Search

// const TagsContainer = styled(Flex)`
// 	background: white;
// 	color: black;
// `
