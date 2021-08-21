// this is just a test for a chakra ui paginator
import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
import { Center, Flex, Select, Stack } from "@chakra-ui/react"
import {
	PaginationContainer as Container,
	PaginationNext as Next,
	PaginationPage as Page,
	PaginationPageGroup as PageGroup,
	Pagination,
	PaginationPrevious as Previous,
	PaginationSeparator as Separator,
	usePagination,
} from "@ajna/pagination"

const fetchPosts = async (pageSize, offset) => {
	return await fetch(
		`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
	).then(async res => await res.json())
}

const Paginate = () => {
	const [postsTotal, setPostsTotal] = useState(undefined)
	const [posts, setPosts] = useState([])
	const outerLimit = 1
	const innerLimit = 1
	const {
		pages,
		pagesCount,
		offset,
		currentPage,
		setCurrentPage,
		pageSize,
		setPageSize,
	} = usePagination({
		total: postsTotal,
		limits: {
			outer: outerLimit,
			inner: innerLimit,
		},
		initialState: {
			pageSize: 10,
			currentPage: 1,
		},
	})

	useEffect(() => {
		fetchPosts(pageSize, offset)
			.then(posts => {
				setPostsTotal(posts?.count)
				setPosts(posts?.results)
			})
			.catch(err => console.error(err))
	}, [currentPage, pageSize, offset])

	const handlePageChange = nextPage => {
		setCurrentPage(nextPage)
	}

	const handlePageSizeChange = event => {
		const pageSize = Number(event.target.value)

		setPageSize(pageSize)
	}

	return (
		<Stack>
			<Pagination
				currentPage={currentPage}
				pagesCount={pagesCount}
				onPageChange={handlePageChange}
			>
				<Container align="center" justify="space-between" p={4} w="full">
					<Previous colorScheme="primary">Previous</Previous>
					<PageGroup isInline align="center" separator={<Separator w={7} />}>
						{pages?.map(page => (
							<Page
								key={`pagination_page_${page}`}
								colorScheme="primary"
								page={page}
								w={7}
							/>
						))}
					</PageGroup>
					<Next colorScheme="primary">Next</Next>
				</Container>
			</Pagination>

			<Center w="full">
				<Select ml={3} w={40} onChange={handlePageSizeChange}>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="20">20</option>
				</Select>
			</Center>
			<Flex direction="column" mt={20} px={20}>
				{posts?.map(({ name }) => (
					<Center key={name} p={4}>
						{name}
					</Center>
				))}
			</Flex>
		</Stack>
	)
}

export default Paginate
