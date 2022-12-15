import { Button, Stack, useDisclosure } from '@chakra-ui/react'
import loadable from '@loadable/component'
import { FaChevronUp } from 'react-icons/fa'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { usePostsStore } from './state/postsStore'
import { UserI } from './types'
import { getUserLocalStorage } from './utils/getUserLocalStorage'
import { useScroll } from './hooks/useScroll'

const ScrollToTop = loadable(() => import('./components/common/ScrollToTop'))
const About = loadable(() => import('./components/About'))
const Auth = loadable(() => import('./components/Auth'))
const Creator = loadable(() => import('./components/Creator'))
const NotFoundPage = loadable(() => import('./components/NotFoundPage'))
const Footer = loadable(() => import('./components/Footer'))
const Home = loadable(() => import('./components/Home'))
const Navbar = loadable(() => import('./components/Navbar/Navbar'))
const PostDetails = loadable(() => import('./components/PostDetails'))
const SavedPosts = loadable(() => import('./components/SavedPosts'))
const Tags = loadable(() => import('./components/Tags'))
const SearchView = loadable(() => import('./components/SearchView'))
const TopPosts = loadable(() => import('./components/TopPosts'))
const Settings = loadable(() => import('./components/Settings/Settings'))
const LoadingScreen = loadable(
	() => import('./components/common/LoadingScreen/LoadingScreen')
)

export const App = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { checkScrollTop, scrollTop, showScroll } = useScroll()
	const { setCurrentId } = usePostsStore()
	const user: UserI = getUserLocalStorage()
	const userId = user?.result?.googleId || user?.result?._id

	const handleOnClose = async () => {
		await setCurrentId(null)
		onClose()
	}

	window.addEventListener('scroll', checkScrollTop)

	return (
		<BrowserRouter>
			<LoadingScreen />
			<ScrollToTop />
			<Navbar isOpen={isOpen} onClose={handleOnClose} onOpen={onOpen} />
			<Stack minH='100vh'>
				<Routes>
					<Route element={<Navigate replace={true} to='posts' />} path='/' />
					<Route element={<Home onOpen={onOpen} />} path='posts' />
					<Route element={<PostDetails user={user} />} path='posts/:id' />
					<Route element={<SearchView />} path='search' />
					<Route
						element={
							userId ? <Settings user={user} /> : <Navigate replace={true} to='/' />
						}
						path={`settings/${userId}`}
					/>
					<Route element={<Creator />} path='creator/:id' />
					<Route element={<Tags />} path='tags/:name' />
					<Route
						element={userId ? <SavedPosts /> : <Navigate replace={true} to='/' />}
						path='saved/:id'
					/>
					<Route
						element={userId ? <Navigate replace={true} to='/' /> : <Auth />}
						path='auth'
					/>
					<Route element={<About />} path='about' />
					<Route element={<TopPosts />} path='posts/top' />
					<Route element={<NotFoundPage />} path='*' />
				</Routes>
			</Stack>

			<Button
				borderRadius='100%'
				bottom={['16px', '32px']}
				className='button'
				display={showScroll ? 'flex' : 'none'}
				h='38px'
				pos='fixed'
				right={['16px', '32px']}
				size='sm'
				variant='solid'
				w='38px'
				zIndex={1}
				onClick={scrollTop}
			>
				<FaChevronUp />
			</Button>
			<Footer />
			<ToastContainer />
		</BrowserRouter>
	)
}
