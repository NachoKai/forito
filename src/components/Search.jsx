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
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { usePostsStore } from '../state/postsStore'
import { CreateGradColor } from '../theme.ts'
import { showError } from '../utils/showError.ts'
import { ChakraTagInput } from './common/ChakraTagInput'
import { FormInput } from './common/FormInput'

export const Search = () => {
	const navigate = useNavigate()
	const { getPostsBySearch } = usePostsStore()
	const [searchValue, setSearchValue] = useState('')
	const [searchTags, setSearchTags] = useState([])
	const ENTER_KEYCODE = 13

	const searchPost = async () => {
		try {
			if (searchValue.trim() || searchTags) {
				setSearchValue('')
				setSearchTags([])
				await getPostsBySearch({ search: searchValue, tags: searchTags.join(',') })
				navigate(`?searchQuery=${searchValue || 'none'}&tags=${searchTags.join(',')}`)
			}
		} catch (err) {
			showError("Couldn't search posts")
		}
	}

	const handleKeyDown = e => {
		const disabled = !searchValue?.trim()?.length && !searchTags?.length

		if (e.keyCode === ENTER_KEYCODE && !disabled) {
			searchPost()
		}
	}

	const handleAddTag = tag => setSearchTags([...searchTags, tag])

	const handleDeleteTag = tagToDelete =>
		setSearchTags(searchTags.filter(tag => tag !== tagToDelete))

	return (
		<Accordion
			allowToggle
			bg='primary_100_900'
			borderRadius='24px'
			className='container'
			p={{ sm: '3', md: '5', lg: '5', xl: '5' }}
			w='100%'
		>
			<AccordionItem border='none'>
				<AccordionButton>
					<Text fontSize='lg' fontWeight='bold'>
						Advanced Search
					</Text>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel>
					<Stack spacing='4'>
						<FormInput
							label='Search Posts Title'
							maxLength='105'
							name='search'
							value={searchValue}
							onChange={e => {
								setSearchValue(e.target.value)
							}}
							onKeyDown={handleKeyDown}
						/>
						<FormInput
							child={
								<TagsContainer w='100%'>
									<ChipInput
										setTags={setSearchTags}
										tags={searchTags}
										onAdd={tag => handleAddTag(tag)}
										onDelete={tag => handleDeleteTag(tag)}
									/>
								</TagsContainer>
							}
							helper='Insert tag with enter/return.'
							label='Search Posts Tags'
							maxLength='105'
						/>
						<Button
							bgGradient={CreateGradColor('primary', 400, 800, 100, 400)}
							disabled={!searchValue?.trim()?.length && !searchTags?.length}
							onClick={searchPost}
						>
							Search
						</Button>
					</Stack>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	)
}

const TagsContainer = styled(Flex)`
	background: white;
	color: black;
	display: flex;
	align-items: center;
	border-radius: 8px;
`
const ChipInput = ({ tags, setTags }) => {
	const handleTagsChange = (event, tags) => {
		setTags(tags)
	}

	return (
		<Stack p={2} w='100%'>
			<ChakraTagInput tags={tags} w='100%' onTagsChange={handleTagsChange} />
		</Stack>
	)
}

ChipInput.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string),
	setTags: PropTypes.func,
}
