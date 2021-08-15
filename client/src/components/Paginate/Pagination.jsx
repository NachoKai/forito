// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
import { Pagination, PaginationItem } from "@material-ui/lab"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Flex } from "@chakra-ui/react"

// import { getPosts } from "../../redux/posts"

const Paginate = ({ page }) => {
	// const { numberOfPages } = useSelector(state => state.posts)
	// const dispatch = useDispatch()

	// useEffect(() => {
	// 	if (page) {
	// 		dispatch(getPosts(page))
	// 	}
	// }, [dispatch, page])

	return (
		<Container>
			<Pagination
				count={5}
				// count={numberOfPages}
				page={Number(page) || 1}
				renderItem={item => (
					<PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
					// <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
				)}
			/>
		</Container>
	)
}

export default Paginate

const Container = styled(Flex)`
	.MuiPagination-root {
		.MuiPaginationItem-root {
			background: purple;
			color: white;
		}
	}
`
