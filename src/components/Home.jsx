import { Flex, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FaPencilAlt } from 'react-icons/fa'
import { usePosts } from '../hooks/data/posts'

import { useLocationQuery } from '../utils/useLocationQuery'
import { Loading } from './common/Loading'
import { Paginate } from './Paginate'
import { Posts } from './Posts'

const Home = ({ onOpen }) => {
	const locationQuery = useLocationQuery()
	const page = Number(locationQuery.get('page') || 1)
	const searchQuery = locationQuery.get('searchQuery')
	const { data: posts, isLoading, isError, isSuccess, error } = usePosts(page)

	return (
		<Stack pb='4'>
			<Stack
				direction={{ sm: 'column-reverse', md: 'column-reverse', lg: 'row', xl: 'row' }}
				px={{ sm: '0', md: '10', lg: '16', xl: '24' }}
				py={{ sm: '6', md: '6', lg: '8', xl: '8' }}
				spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			>
				<Stack w='100%'>
					{isError ? (
						<Text color='primary.400' fontSize='xl'>
							Error: {error}
						</Text>
					) : isLoading ? (
						<Loading />
					) : isSuccess && posts?.length > 0 ? (
						<Posts posts={posts} onOpen={onOpen} />
					) : (
						<Flex align='center' direction='column' my='64px'>
							<Text color='primary.400' fontSize='6xl'>
								<FaPencilAlt />
							</Text>
							<Text color='primary.400' fontSize='6xl'>
								No posts found
							</Text>
						</Flex>
					)}
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
