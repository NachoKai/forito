import { Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts } from '../redux/posts'

import { useQuery } from '../utils/useQuery.ts'
import { Paginate } from './Paginate'
import { Posts } from './Posts'

export const Home = ({ onOpen }) => {
	const dispatch = useDispatch()
	const query = useQuery()
	const page = Number(query.get('page') || 1)
	const searchQuery = query.get('searchQuery')

	useEffect(() => {
		dispatch(getPosts(page))
	}, [dispatch, page])

	return (
		<Stack paddingBottom='4'>
			<Stack
				direction={{ sm: 'column-reverse', md: 'column-reverse', lg: 'row', xl: 'row' }}
				px={{ sm: '0', md: '10', lg: '16', xl: '24' }}
				py={{ sm: '6', md: '6', lg: '8', xl: '8' }}
				spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			>
				<Stack w='100%'>
					<Posts searchQuery={searchQuery} onOpen={onOpen} />
				</Stack>
			</Stack>
			<Stack px={{ sm: '4', md: '10', lg: '16', xl: '24' }}>
				{!searchQuery && <Paginate page={page} />}
			</Stack>
		</Stack>
	)
}

Home.propTypes = {
	onOpen: PropTypes.func,
}
