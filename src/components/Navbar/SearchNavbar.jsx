import { Button, Stack } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'

import { usePostsStore } from '../../state/postsStore'
import FormInput from '../common/FormInput'

const SearchNavbar = () => {
	const navigate = useNavigate()
	const [searchValue, setSearchValue] = useState('')
	const [searchTags, setSearchTags] = useState([])
	const location = useLocation()
	const ENTER_KEYCODE = 13
	const getPostsBySearch = usePostsStore(state => state.getPostsBySearch)

	const searchPost = useCallback(() => {
		if (searchValue.trim() || searchTags) {
			setSearchValue('')
			setSearchTags([])(
				getPostsBySearch({ search: searchValue, tags: searchTags.join(',') })
			)
			navigate(
				`${location?.pathname}?searchQuery=${
					searchValue || 'none'
				}&tags=${searchTags.join(',')}`
			)
		} else {
			navigate('/')
		}
	}, [getPostsBySearch, location?.pathname, navigate, searchTags, searchValue])

	const handleKeyPress = e => e?.keyCode === ENTER_KEYCODE && searchPost()

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
				onKeyPress={handleKeyPress}
			/>
		</Stack>
	)
}

export default SearchNavbar
