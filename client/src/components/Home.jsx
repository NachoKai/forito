import { useRef, useState } from 'react'
import { Stack } from '@chakra-ui/react'

import Posts from './Posts'
import Form from '../components/Form'
import Pagination from './Pagination'
import Search from './Search'
import { useQuery } from '../utils/useQuery'

const Home = () => {
	const [currentId, setCurrentId] = useState(0)
	const query = useQuery()
	const page = query.get('page') || 1
	const searchQuery = query.get('searchQuery')
	const formRef = useRef(null)

	const handleScroll = async () => formRef.current.scrollIntoView({ behavior: 'smooth' })

	return (
		<Stack paddingBottom='4'>
			<Stack
				direction={{ sm: 'column-reverse', md: 'column-reverse', lg: 'row', xl: 'row' }}
				p={{ sm: '0', md: '0', lg: '8', xl: '8' }}
				spacing={{
					sm: '6',
					md: '8',
					lg: '8',
					xl: '8',
				}}
			>
				<Stack w='100%'>
					<Posts
						handleScroll={handleScroll}
						searchQuery={searchQuery}
						setCurrentId={setCurrentId}
					/>
				</Stack>
				<Stack spacing='4'>
					<Stack ref={formRef} marginTop='-4' />
					<Form currentId={currentId} setCurrentId={setCurrentId} />
					<Search />
					{!searchQuery && <Pagination page={page} />}
				</Stack>
			</Stack>
			<Stack paddingX={{ sm: '0', md: '0', lg: '32px', xl: '32px' }}>
				{!searchQuery && <Pagination page={page} />}
			</Stack>
		</Stack>
	)
}

export default Home
