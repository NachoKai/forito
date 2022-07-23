import { useCallback, useState } from 'react'
import { Button, Stack } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { getPostsBySearch } from '../redux/posts'
import FormInput from './common/FormInput'

const SearchNavbar = () => {
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

	return (
		<Stack align='center' display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}>
			<FormInput
				maxLength='105'
				name='search'
				placeholder='Search...'
				rightIcon={
					<Button
						colorScheme='primary'
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
