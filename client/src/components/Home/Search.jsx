import { useState } from "react"
import { useDispatch } from "react-redux"
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Button,
	Flex,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import ChipInput from "material-ui-chip-input"
import styled from "styled-components"

import { getPostsBySearch } from "../../redux/posts"
import FormInput from "../common/FormInput"
// import TagsInput from "../common/TagsInput"

const Search = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [searchValue, setSearchValue] = useState("")
	const [searchTags, setSearchTags] = useState([])
	const bg = useColorModeValue("primary.100", "primary.900")

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
		if (e.keyCode === 13) {
			searchPost()
		}
	}

	const handleAddTag = tag => setSearchTags([...searchTags, tag])
	const handleDeleteTag = tagToDelete =>
		setSearchTags(searchTags.filter(tag => tag !== tagToDelete))

	return (
		<Accordion allowToggle bg={bg} borderRadius="lg" colorScheme="primary">
			<AccordionItem>
				<AccordionButton>
					<Text fontSize="lg" fontWeight="bold">
						Search
					</Text>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel>
					<Stack>
						<FormInput
							label="Search Posts"
							maxLength="105"
							name="search"
							placeholder="Search Posts"
							value={searchValue}
							onChange={e => {
								setSearchValue(e.target.value)
							}}
							onKeyPress={handleKeyPress}
						/>
						<FormInput
							child={
								<TagsContainer>
									<ChipInput
										disableUnderline
										value={searchTags}
										onAdd={tag => handleAddTag(tag)}
										onDelete={tag => handleDeleteTag(tag)}
									/>
								</TagsContainer>
							}
							label="Search Tags"
							maxLength="105"
							placeholder="Search Tags"
						/>
						{/* <TagsInput searchTags={searchTags} setSearchTags={setSearchTags} /> */}
						<Button colorScheme="primary" onClick={searchPost}>
							Search
						</Button>
					</Stack>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	)
}

export default Search

const TagsContainer = styled(Flex)`
	background: white;
	color: black;
	display: flex;
	align-items: center;
	height: 100%;
	padding: 4px;
	border-radius: 8px;
`
