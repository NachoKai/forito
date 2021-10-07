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
} from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import ChipInput from "material-ui-chip-input"
import styled from "styled-components"

import { getPostsBySearch } from "../redux/posts"
import FormInput from "./common/FormInput"
import { CreateBg } from "../theme"

const Search = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [searchValue, setSearchValue] = useState("")
	const [searchTags, setSearchTags] = useState([])

	const searchPost = () => {
		if (searchValue.trim() || searchTags) {
			setSearchValue("")
			setSearchTags([])
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
		<Accordion
			allowToggle
			bg={CreateBg("primary", 100, 900)}
			borderRadius="lg"
			colorScheme="primary"
		>
			<AccordionItem>
				<AccordionButton>
					<Text fontSize="lg" fontWeight="bold">
						Search
					</Text>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel>
					<Stack spacing="4">
						<FormInput
							label="Search Posts Title"
							maxLength="105"
							name="search"
							placeholder="Search Posts Title"
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
										placeholder="Search Tags"
										style={{ margin: "0 8px 0 16px", padding: "8px 8px 0 0" }}
										value={searchTags}
										onAdd={tag => handleAddTag(tag)}
										onDelete={tag => handleDeleteTag(tag)}
									/>
								</TagsContainer>
							}
							helper="Insert tag with enter/return."
							label="Search Tags"
							maxLength="105"
						/>
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
	border-radius: 8px;
`
