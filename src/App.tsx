import { Button, Stack, useBoolean, useDisclosure } from '@chakra-ui/react'
import loadable from '@loadable/component'
import { FaChevronUp } from 'react-icons/fa'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { usePostsStore } from './state/postsStore'
import { UserI } from './types'
import { getUserLocalStorage } from './utils/getUserLocalStorage'

const ScrollToTop = loadable(() => import('./components/common/ScrollToTop'))
const About = loadable(() => import('./components/About'))
const Auth = loadable(() => import('./components/Auth'))
const Creator = loadable(() => import('./components/Creator'))
const ErrorPage = loadable(() => import('./components/ErrorPage'))
const Footer = loadable(() => import('./components/Footer'))
const Home = loadable(() => import('./components/Home'))
const Navbar = loadable(() => import('./components/Navbar/Navbar'))
const PostDetails = loadable(() => import('./components/PostDetails'))
const SavedPosts = loadable(() => import('./components/SavedPosts'))
const Tags = loadable(() => import('./components/Tags'))
const SearchView = loadable(() => import('./components/SearchView'))
const TopPosts = loadable(() => import('./components/TopPosts'))
const LoadingScreen = loadable(
	() => import('./components/common/LoadingScreen/LoadingScreen')
)

export const App = () => {
	const [showScroll, setShowScroll] = useBoolean()
	const user: UserI = getUserLocalStorage()
	const userEmail = user?.result?.email
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { setCurrentId } = usePostsStore()

	const handleOnclose = async () => {
		await setCurrentId(null)
		onClose()
	}

	const checkScrollTop = () => {
		if (!showScroll && window.scrollY > 400) {
			setShowScroll.on()
		} else if (showScroll && window.scrollY <= 400) {
			setShowScroll.off()
		}
	}

	const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

	window.addEventListener('scroll', checkScrollTop)

	return (
		<BrowserRouter>
			<LoadingScreen />
			<ScrollToTop />
			<Navbar isOpen={isOpen} onClose={handleOnclose} onOpen={onOpen} />
			<Stack minH='100vh'>
				<Routes>
					<Route element={<Navigate replace to='posts' />} path='/' />
					<Route element={<Home onOpen={onOpen} />} path='posts' />
					<Route element={<PostDetails user={user} />} path='posts/:id' />
					<Route element={<SearchView />} path='search' />
					<Route element={<Creator />} path='creator/:id' />
					<Route element={<Tags />} path='tags/:name' />
					<Route
						element={userEmail ? <SavedPosts /> : <Navigate replace to='posts' />}
						path='saved/:id'
					/>
					<Route
						element={userEmail ? <Navigate replace to='posts' /> : <Auth />}
						path='auth'
					/>
					<Route element={<About />} path='about' />
					<Route element={<TopPosts />} path='posts/top' />
					<Route element={<ErrorPage />} path='*' />
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
