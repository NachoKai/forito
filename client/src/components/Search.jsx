import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
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
import { useLocation, useNavigate } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import styled from 'styled-components'

import { getPostsBySearch } from '../redux/posts'
import FormInput from './common/FormInput'
import { CreateGradColor } from '../theme'

const Search = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [searchValue, setSearchValue] = useState('')
	const [searchTags, setSearchTags] = useState([])
	const location = useLocation()

	const searchPost = useCallback(() => {
		console.log('location.pathname', location?.pathname)
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

	const handleKeyPress = e => {
		if (e.keyCode === 13) {
			searchPost()
		}
	}

	const handleAddTag = useCallback(
		tag => {
			setSearchTags([...searchTags, tag])
		},
		[searchTags]
	)

	const handleDeleteTag = useCallback(
		tagToDelete => {
			setSearchTags(searchTags.filter(tag => tag !== tagToDelete))
		},
		[searchTags]
	)

	return (
		<Accordion
			allowToggle
			bgGradient={CreateGradColor('primary', 100, 50, 900, 600, '135deg')}
			borderRadius='lg'
			boxShadow='base'
			colorScheme='primary'
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
										disableUnderline
										placeholder='Search Posts Tags'
										style={{ margin: '0 0 0 16px' }}
										value={searchTags}
										onAdd={tag => handleAddTag(tag)}
										onDelete={tag => handleDeleteTag(tag)}
									/>
								</TagsContainer>
							}
							helper='Insert tag with enter/return.'
							label='Search Tags'
							maxLength='105'
						/>
						<Button
							bgGradient={CreateGradColor('primary', 400, 800, 100, 400)}
							boxShadow='blue'
							colorScheme='primary'
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
