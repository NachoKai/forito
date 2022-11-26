import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Button,
	HStack,
	Stack,
	Text,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { usePostsStore } from '../state/postsStore'
import { CreateGradColor } from '../theme'
import { showError } from '../utils/showError'
import { ChakraTagInput } from './common/ChakraTagInput'
import { FormInput } from './common/FormInput'
import { useTags } from '../hooks/useTags'

const ENTER_KEYCODE = 13

export const Search = () => {
	const navigate = useNavigate()
	const { getPostsBySearch } = usePostsStore()
	const [searchValue, setSearchValue] = useState('')
	const { searchTags, setSearchTags, handleAddTag, handleDeleteTag } = useTags()
	const isInputEmpty = !searchValue?.trim()?.length && !searchTags?.length

	const searchPost = useCallback(async () => {
		try {
			if (searchValue.trim() || searchTags) {
				setSearchValue('')
				setSearchTags([])
				await getPostsBySearch({ search: searchValue, tags: searchTags.join(',') })
				navigate(`?searchQuery=${searchValue || 'none'}&tags=${searchTags.join(',')}`)
			}
		} catch (err) {
			showError(
				<>
					<Text fontWeight='bold'>{err.name}</Text>
					<Text>Something went wrong when trying to search post. {err.message}</Text>
					<Text>Please try again.</Text>
				</>
			)
		}
	}, [getPostsBySearch, navigate, searchTags, searchValue, setSearchTags])

	const handleKeyDown = e => {
		const disabled = !searchValue?.trim()?.length && !searchTags?.length

		if (e.keyCode === ENTER_KEYCODE && !disabled) {
			searchPost()
		}
	}

	const handleClear = () => {
		setSearchValue('')
		setSearchTags([])
	}

	return (
		<Accordion
			allowToggle
			bg='primary_100_900'
			borderRadius='24px'
			className='container'
			p={{ sm: '2', md: '4', lg: '4', xl: '4' }}
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
								<ChipInput
									setTags={setSearchTags}
									tags={searchTags}
									onAdd={tag => handleAddTag(tag?.toLowerCase())}
									onDelete={tag => handleDeleteTag(tag?.toLowerCase())}
								/>
							}
							helper='Insert tag with enter/return.'
							label='Search Posts Tags'
						/>
						<HStack spacing='4'>
							<Button
								bgGradient={CreateGradColor('primary', 400, 800, 100, 400)}
								className={isInputEmpty ? '' : 'button'}
								disabled={isInputEmpty}
								flexGrow='1'
								onClick={searchPost}
							>
								Search
							</Button>
							<Button
								className={isInputEmpty ? '' : 'button'}
								disabled={isInputEmpty}
								flexGrow='1'
								variant='outline'
								onClick={handleClear}
							>
								Clear
							</Button>
						</HStack>
					</Stack>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	)
}

const ChipInput = ({ tags, setTags }) => {
	const handleTagsChange = (event, tags) => {
		setTags([...new Set(tags)])
	}

	return <ChakraTagInput tags={tags} w='100%' onTagsChange={handleTagsChange} />
}

ChipInput.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string),
	setTags: PropTypes.func,
}
