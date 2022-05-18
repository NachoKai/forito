import { Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import Posts from './Posts'
import Paginate from '././Paginate'
import { useQuery } from '../utils/useQuery'

const Home = ({ onOpen }) => {
	const query = useQuery()
	const page = query.get('page') || 1
	const searchQuery = query.get('searchQuery')

	return (
		<Stack paddingBottom='4'>
			<Stack
				direction={{ sm: 'column-reverse', md: 'column-reverse', lg: 'row', xl: 'row' }}
				px={{ sm: '0', md: '10', lg: '16', xl: '24' }}
				py={{ sm: '0', md: '6', lg: '8', xl: '8' }}
				spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			>
				<Stack w='100%'>
					<Posts searchQuery={searchQuery} onOpen={onOpen} />
				</Stack>
			</Stack>
			<Stack px={{ sm: '0', md: '10', lg: '16', xl: '24' }}>
				{!searchQuery && <Paginate page={page} />}
			</Stack>
		</Stack>
	)
}

export default Home

Home.propTypes = {
	onOpen: PropTypes.func,
}
