import { Stack } from '@chakra-ui/react'

import Posts from './Posts'
import Pagination from './Pagination'
import { useQuery } from '../utils/useQuery'

const Home = ({ onOpen }) => {
	const query = useQuery()
	const page = query.get('page') || 1
	const searchQuery = query.get('searchQuery')

	return (
		<Stack paddingBottom='4'>
			<Stack
				direction={{ sm: 'column-reverse', md: 'column-reverse', lg: 'row', xl: 'row' }}
				p={{ sm: '0', md: '6', lg: '8', xl: '8' }}
				spacing={{
					sm: '6',
					md: '8',
					lg: '8',
					xl: '8',
				}}
			>
				<Stack w='100%'>
					<Posts searchQuery={searchQuery} onOpen={onOpen} />
				</Stack>
			</Stack>
			<Stack paddingX={{ sm: '0', md: '0', lg: '32px', xl: '32px' }}>
				{!searchQuery && <Pagination page={page} />}
			</Stack>
		</Stack>
	)
}

export default Home
