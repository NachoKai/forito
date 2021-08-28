// import {
// 	FormControl,
// 	FormHelperText,
// 	FormLabel,
// 	HStack,
// 	Input,
// 	InputGroup,
// 	Tag,
// 	TagCloseButton,
// 	TagLabel,
// } from "@chakra-ui/react"
// import { useState } from "react"

// const TagsInput = ({ setSearchTags, searchTags }) => {
// 	const [tag, setTag] = useState("")

// 	const handleAddTag = tag => setSearchTags([...searchTags, tag])

// 	const handleDeleteTag = tagToDelete =>
// 		setSearchTags(searchTags.filter(tag => tag !== tagToDelete))

// 	const handleChange = e => {
// 		setTag(e.target.value)
// 	}

// 	const handleKeyPress = e => {
// 		if (e.key === "Enter" || e.key === ",") {
// 			handleAddTag(tag)
// 		}
// 	}

// 	return (
// 		<>
// 			<FormControl>
// 				<FormLabel>Search Tags</FormLabel>
// 				<FormHelperText>Separated by commas.</FormHelperText>
// 				<InputGroup bg="white" borderRadius="lg" overflow="auto">
// 					<HStack spacing={4}>
// 						{searchTags?.length > 0 &&
// 							searchTags.map(tag => (
// 								<Tag
// 									key={tag}
// 									borderRadius="full"
// 									colorScheme="primary"
// 									tag={tag}
// 									variant="solid"
// 								>
// 									<TagLabel>{tag}</TagLabel>
// 									<TagCloseButton onClick={handleDeleteTag} />
// 								</Tag>
// 							))}
// 					</HStack>
// 					<Input
// 						_placeholder={{ color: "gray" }}
// 						bg="white"
// 						color="black"
// 						errorBorderColor="red.300"
// 						focusBorderColor="primary.200"
// 						maxLength="105"
// 						placeholder="Search Tags"
// 						value={tag}
// 						variant="outline"
// 						onChange={handleChange}
// 						onKeyPress={handleKeyPress}
// 					/>
// 				</InputGroup>
// 			</FormControl>
// 		</>
// 	)
// }

// export default TagsInput
