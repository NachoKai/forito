import { Button, Stack, Text } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { usePostsStore } from '../../state/postsStore'
import { showError } from '../../utils/showError'
import { FormInput } from '../common/FormInput'

const ENTER_KEYCODE = 13

export const SearchNavbar = () => {
	const navigate = useNavigate()
	const [searchValue, setSearchValue] = useState('')
	const [searchTags, setSearchTags] = useState([])
	const { setSearchQuery } = usePostsStore()

	const searchPost = useCallback(async () => {
		try {
			if (searchValue.trim() || searchTags) {
				setSearchValue('')
				setSearchTags([])
				await setSearchQuery({ search: searchValue, tags: searchTags.join(',') })
				navigate(
					`search?searchQuery=${searchValue || 'none'}&tags=${searchTags.join(',')}`
				)
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
	}, [setSearchQuery, navigate, searchTags, searchValue])

	const handleKeyDown = useCallback(
		e => {
			const disabled = !searchValue?.trim()?.length && !searchTags?.length

			if (e.keyCode === ENTER_KEYCODE && !disabled) searchPost()
		},
		[searchPost, searchTags?.length, searchValue]
	)

	return (
		<Stack align='center' display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}>
			<FormInput
				maxLength='105'
				name='search'
				placeholder='Search...'
				rightIcon={
					<Button
						data-cy='navbar-search-button'
						disabled={!searchValue?.trim()?.length && !searchTags?.length}
						size='sm'
						title='Search'
						variant='ghost'
						onClick={searchPost}
					>
						<FaSearch />
					</Button>
				}
				value={searchValue}
				onChange={e => {
					setSearchValue(e.target.value)
				}}
				onKeyDown={handleKeyDown}
			/>
		</Stack>
	)
}
