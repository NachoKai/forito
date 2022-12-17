import { Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { usePostsBySearch } from '../hooks/data/posts'
import { useLocationQuery } from '../utils/useLocationQuery'
import ErrorPage from './ErrorPage'
import { Posts } from './Posts'
import { Search } from './Search'
import { Loading } from './common/Loading'
import { usePostsStore } from '../state/postsStore'

const SearchView = () => {
	const location = useLocationQuery()
	const { searchQuery, tagsQuery } = usePostsStore()
	const searchQueryText = searchQuery || location.get('searchQuery')
	const tagsQueryText = tagsQuery || location.get('tags')
	const locationQuery = {
		search: searchQueryText,
		tags: tagsQueryText,
	}
	const { postsBySearch, isLoading, isError, error, isFetching } =
		usePostsBySearch(locationQuery)

	if (isError) return <ErrorPage error={error} />
	if (isLoading || isFetching) return <Loading />

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
					<Posts
						highlight={searchQueryText || ''}
						posts={locationQuery.search || locationQuery.tags ? postsBySearch : []}
					/>
				</Stack>
			</Stack>
		</Stack>
	)
}

SearchView.propTypes = {
	onOpen: PropTypes.func,
}

export default SearchView
