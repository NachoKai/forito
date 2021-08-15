import React, { useEffect, useState } from "react"
import { Center, Flex, Select, Stack, Text } from "@chakra-ui/react"
import {
	Pagination,
	PaginationContainer,
	PaginationNext,
	PaginationPage,
	PaginationPageGroup,
	PaginationPrevious,
	PaginationSeparator,
	usePagination,
} from "@ajna/pagination"

const fetchPosts = async (pageSize, offset) => {
	return await fetch(
		`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
	).then(async res => await res.json())
}

const Paginator = () => {
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
				setPostsTotal(posts.count)
				setPosts(posts.results)
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
		<>
			<Stack>
				<Pagination
					currentPage={currentPage}
					pagesCount={pagesCount}
					onPageChange={handlePageChange}
				>
					<PaginationContainer align="center" justify="space-between" p={4} w="full">
						<PaginationPrevious>
							<Text>Previous</Text>
						</PaginationPrevious>
						<PaginationPageGroup
							isInline
							align="center"
							separator={<PaginationSeparator w={7} />}
						>
							{pages.map(page => (
								<PaginationPage key={`pagination_page_${page}`} page={page} w={7} />
							))}
						</PaginationPageGroup>
						<PaginationNext>
							<Text>Next</Text>
						</PaginationNext>
					</PaginationContainer>
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
							<Text>{name}</Text>
						</Center>
					))}
				</Flex>
			</Stack>
		</>
	)
}

export default Paginator
