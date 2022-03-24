import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Stack } from '@chakra-ui/react'
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

	const handleKeyPress = e => e.keyCode === ENTER_KEYCODE && searchPost()

	return (
		<Stack
			align='center'
			direction='row'
			display={{
				sm: 'none',
				md: 'none',
				lg: 'flex',
				xl: 'flex',
			}}
			spacing='2'
		>
			<FormInput
				maxLength='105'
				name='search'
				placeholder='Search...'
				value={searchValue}
				onChange={e => {
					setSearchValue(e.target.value)
				}}
				onKeyPress={handleKeyPress}
			/>
			<Button
				colorScheme='primary'
				disabled={!searchValue && !searchTags?.length}
				onClick={searchPost}
			>
				Search
			</Button>
		</Stack>
	)
}

export default SearchNavbar
