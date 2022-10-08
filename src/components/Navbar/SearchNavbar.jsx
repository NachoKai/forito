import { Button, Stack } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { usePostsStore } from '../../state/postsStore'
import { FormInput } from '../common/FormInput'

export const SearchNavbar = () => {
	const navigate = useNavigate()
	const [searchValue, setSearchValue] = useState('')
	const [searchTags, setSearchTags] = useState([])
	const { getPostsBySearch } = usePostsStore()
	const ENTER_KEYCODE = 13

	const searchPost = useCallback(() => {
		if (searchValue.trim() || searchTags) {
			setSearchValue('')
			setSearchTags([])
			getPostsBySearch({ search: searchValue, tags: searchTags.join(',') })
			navigate(`posts?searchQuery=${searchValue || 'none'}&tags=${searchTags.join(',')}`)
		} else {
			navigate('/posts')
		}
	}, [getPostsBySearch, navigate, searchTags, searchValue])

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
