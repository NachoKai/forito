import { Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { usePostsStore } from '../state/postsStore'

import { useLocationQuery } from '../utils/useLocationQuery'
import { Paginate } from './Paginate'
import { Posts } from './Posts'

const Home = ({ onOpen }) => {
	const locationQuery = useLocationQuery()
	const { posts, getPosts } = usePostsStore()
	const page = Number(locationQuery.get('page') || 1)
	const searchQuery = locationQuery.get('searchQuery')

	useEffect(() => {
		getPosts(page)
	}, [getPosts, page])

	return (
		<Stack pb='4'>
			<Stack
				direction={{ sm: 'column-reverse', md: 'column-reverse', lg: 'row', xl: 'row' }}
				px={{ sm: '0', md: '10', lg: '16', xl: '24' }}
				py={{ sm: '6', md: '6', lg: '8', xl: '8' }}
				spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			>
				<Stack w='100%'>
					<Posts posts={posts} onOpen={onOpen} />
				</Stack>
			</Stack>
			<Stack px={{ sm: '4', md: '10', lg: '16', xl: '24' }}>
				{!searchQuery && <Paginate />}
			</Stack>
		</Stack>
	)
}

Home.propTypes = {
	onOpen: PropTypes.func,
}

export default Home
