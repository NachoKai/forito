import { Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { usePostsStore } from '../state/postsStore'

import { useLocationQuery } from '../utils/useLocationQuery.ts'
import { Paginate } from './Paginate'
import { Posts } from './Posts'

const Home = ({ onOpen }) => {
	const locationQuery = useLocationQuery()
	const page = Number(locationQuery.get('page') || 1)
	const searchQuery = locationQuery.get('searchQuery')
	const { getPosts } = usePostsStore()

	useEffect(() => {
		getPosts(page)
	}, [getPosts, page])

	return (
		<Stack paddingBottom='4'>
			<Stack
				direction={{ sm: 'column-reverse', md: 'column-reverse', lg: 'row', xl: 'row' }}
				px={{ sm: '0', md: '10', lg: '16', xl: '24' }}
				py={{ sm: '6', md: '6', lg: '8', xl: '8' }}
				spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			>
				<Stack w='100%'>
					<Posts onOpen={onOpen} />
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
