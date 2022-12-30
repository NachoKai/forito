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
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { showError } from '../utils/showError'
import { usePostsStore } from '../state/postsStore'
import { CreateGradColor } from '../theme'
import { ChipInput } from './common/ChipInput'
import { FormInput } from './common/FormInput'

const ENTER_KEYCODE = 13

export const Search = () => {
	const navigate = useNavigate()
	const { setSearchQuery, setTagsQuery } = usePostsStore()
	const [searchValue, setSearchValue] = useState('')
	const [searchTags, setSearchTags] = useState([])
	const isInputEmpty = !searchValue?.trim()?.length && !searchTags?.length

	const handleAddTag = tag => setSearchTags([...searchTags, tag])

	const handleDeleteTag = tagToDelete =>
		setSearchTags(searchTags.filter(tag => tag !== tagToDelete))

	const searchPost = useCallback(async () => {
		try {
			if (searchValue.trim() || searchTags) {
				setSearchValue('')
				setSearchTags([])
				await setSearchQuery(searchValue)
				await setTagsQuery(searchTags.join(','))
				navigate(`?searchQuery=${searchValue || ''}&tags=${searchTags.join(',')}`)
			}
		} catch (err) {
			showError('Something went wrong when trying to search post. Please try again.')
			console.error(err)
		}
	}, [searchValue, searchTags, setSearchQuery, setTagsQuery, navigate])

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
