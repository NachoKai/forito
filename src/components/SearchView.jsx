import { Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { usePostsStore } from '../state/postsStore'
import { useLocationQuery } from '../utils/useLocationQuery'
import { Posts } from './Posts'
import { Search } from './Search'

const SearchView = () => {
	const locationQuery = useLocationQuery()
	const searchQuery = locationQuery.get('searchQuery')
	const { posts } = usePostsStore()

	return (
		<Stack pb='4'>
			<Stack
				direction={{ sm: 'column-reverse', md: 'column-reverse', lg: 'row', xl: 'row' }}
				px={{ sm: '0', md: '10', lg: '16', xl: '24' }}
				py={{ sm: '6', md: '6', lg: '8', xl: '8' }}
				spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			>
				<Stack align='center' spacing='8' w='100%'>
					<Search />
					<Posts highlight={searchQuery} posts={searchQuery ? posts : []} />
				</Stack>
			</Stack>
		</Stack>
	)
}

SearchView.propTypes = {
	onOpen: PropTypes.func,
}

export default SearchView
