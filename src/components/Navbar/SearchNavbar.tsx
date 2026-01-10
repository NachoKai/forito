import { Button, Stack } from '@chakra-ui/react'
import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { showError } from '../../utils/showError'
import { usePostsStore } from '../../state/postsStore'
import { FormInput } from '../common/FormInput'

const ENTER_KEYCODE = 13

export const SearchNavbar = () => {
	const navigate = useNavigate()
	const [searchValue, setSearchValue] = useState('')
	const [searchTags, setSearchTags] = useState<string[]>([])
	const { setSearchQuery, setTagsQuery } = usePostsStore()

	const searchPost = useCallback(async () => {
		try {
			if (searchValue.trim() || searchTags) {
				setSearchValue('')
				setSearchTags([])
				await setSearchQuery(searchValue || '')
				await setTagsQuery(searchTags.join(','))
				navigate(`search?searchQuery=${searchValue}&tags=${searchTags.join(',')}`)
			}
		} catch (err) {
			showError('Something went wrong when trying to search post. Please try again.')
			console.error(err)
			throw err
		}
	}, [searchValue, searchTags, setSearchQuery, setTagsQuery, navigate])

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			const disabled = !searchValue?.trim()?.length && !searchTags?.length

			if (e.keyCode === ENTER_KEYCODE && !disabled) searchPost()
		},
		[searchPost, searchTags?.length, searchValue]
	)

	return (
		<Stack align='center' display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}>
			<FormInput
				maxLength={105}
				name='search'
				placeholder='Search...'
				rightIcon={
					<Button
						data-cy='navbar-search-button'
						isDisabled={!searchValue?.trim()?.length && !searchTags?.length}
						size='sm'
						title='Search'
						variant='ghost'
						onClick={searchPost}
					>
						<FaSearch />
					</Button>
				}
				value={searchValue}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setSearchValue(e.target.value)
				}}
				onKeyDown={handleKeyDown}
			/>
		</Stack>
	)
}
