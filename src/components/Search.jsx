import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Button,
	Container,
	Flex,
	Stack,
	Text,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { getPostsBySearch } from '../redux/posts'
import { CreateGradColor } from '../theme.ts'
import getThemeColor from '../utils/getThemeColor.ts'
import ChakraTagInput from './common/ChakraTagInput'
import FormInput from './common/FormInput'

const Search = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [searchValue, setSearchValue] = useState('')
	const [searchTags, setSearchTags] = useState([])
	const location = useLocation()
	const ENTER_KEYCODE = 13

	const searchPost = useCallback(() => {
		if (searchValue.trim() || searchTags) {
			setSearchValue('')
			setSearchTags([])
			dispatch(getPostsBySearch({ search: searchValue, tags: searchTags.join(',') }))
			navigate(
				`${location?.pathname}?searchQuery=${
					searchValue || 'none'
				}&tags=${searchTags.join(',')}`
			)
		} else {
			navigate('/')
		}
	}, [dispatch, location, navigate, searchTags, searchValue])

	const handleKeyPress = e => e?.keyCode === ENTER_KEYCODE && searchPost()

	const handleAddTag = useCallback(
		tag => setSearchTags([...searchTags, tag]),
		[searchTags]
	)

	const handleDeleteTag = useCallback(
		tagToDelete => setSearchTags(searchTags.filter(tag => tag !== tagToDelete)),
		[searchTags]
	)

	return (
		<Accordion
			allowToggle
			bg='primary_100_900'
			borderRadius='lg'
			boxShadow='md'
			maxW={{ sm: '100vw', md: '100vw', lg: '322px', xl: '322px' }}
			minWidth='320px'
			w='100%'
		>
			<AccordionItem>
				<AccordionButton>
					<Text fontSize='lg' fontWeight='bold'>
						Search
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
							onKeyPress={handleKeyPress}
						/>
						<FormInput
							child={
								<TagsContainer>
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
							boxShadow={() => getThemeColor()}
							disabled={!searchValue && !searchTags?.length}
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

export default Search

const TagsContainer = styled(Flex)`
	background: white;
	color: black;
	display: flex;
	align-items: center;
	border-radius: 8px;
`
const ChipInput = ({ tags, setTags }) => {
	const handleTagsChange = useCallback(
		(event, tags) => {
			setTags(tags)
		},
		[setTags]
	)

	return (
		<Container py={2}>
			<ChakraTagInput tags={tags} onTagsChange={handleTagsChange} />
		</Container>
	)
}

ChipInput.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string),
	setTags: PropTypes.func,
}
