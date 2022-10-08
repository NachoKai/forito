import { Button, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { usePostsStore } from '../../state/postsStore'
import { showError } from '../../utils/showError.ts'
import { FormInput } from '../common/FormInput'

export const SearchNavbar = () => {
	const navigate = useNavigate()
	const [searchValue, setSearchValue] = useState('')
	const [searchTags, setSearchTags] = useState([])
	const { getPostsBySearch } = usePostsStore()
	const ENTER_KEYCODE = 13

	const searchPost = async () => {
		try {
			if (searchValue.trim() || searchTags) {
				setSearchValue('')
				setSearchTags([])
				await getPostsBySearch({ search: searchValue, tags: searchTags.join(',') })
				navigate(
					`posts?searchQuery=${searchValue || 'none'}&tags=${searchTags.join(',')}`
				)
			}
		} catch (err) {
			showError("Couldn't search posts")
		}
	}

	const handleKeyDown = e => {
		if (e.keyCode === ENTER_KEYCODE) {
			searchPost()
		}
	}

	return (
		<Stack align='center' display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}>
			<FormInput
				maxLength='105'
				name='search'
				placeholder='Search...'
				rightIcon={
					<Button
						data-cy='navbar-search-button'
						disabled={!searchValue && !searchTags?.length}
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
