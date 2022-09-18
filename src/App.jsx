import { Button, Stack, useDisclosure } from '@chakra-ui/react'
import loadable from '@loadable/component'
import { useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { getThemeColor } from './utils/getThemeColor.ts'
import { getUserLocalStorage } from './utils/getUserLocalStorage.ts'

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
const TopPosts = loadable(() => import('./components/TopPosts'))
const LoadingScreen = loadable(() =>
	import('./components/common/LoadingScreen/LoadingScreen')
)

export const App = () => {
	const [showScroll, setShowScroll] = useState(false)
	const user = getUserLocalStorage()
	const userEmail = user?.result?.email
	const { isOpen, onOpen, onClose } = useDisclosure()

	const checkScrollTop = () => {
		if (!showScroll && window.pageYOffset > 400) {
			setShowScroll(true)
		} else if (showScroll && window.pageYOffset <= 400) {
			setShowScroll(false)
		}
	}

	const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

	window.addEventListener('scroll', checkScrollTop)

	return (
		<BrowserRouter>
			<LoadingScreen />
			<ScrollToTop />
			<Navbar isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
			<Stack minH='100vh'>
				<Routes>
					<Route element={<Navigate replace to='/posts' />} path='/' />
					<Route element={<Home onOpen={onOpen} />} path='posts' />
					<Route element={<Home onOpen={onOpen} />} path='posts/search' />
					<Route element={<PostDetails user={user} />} path='posts/:id' />
					<Route element={<Creator />} path='creator/:id' />
					<Route element={<Tags />} path='tags/:name' />
					<Route
						element={userEmail ? <SavedPosts /> : <Navigate replace to='/posts' />}
						path='saved/:id'
					/>
					<Route
						element={!userEmail ? <Auth /> : <Navigate replace to='/posts' />}
						path='auth'
					/>
					<Route element={<About />} path='about' />
					<Route element={<TopPosts />} path='/posts/top' />
					<Route element={<ErrorPage />} path='*' />
				</Routes>
			</Stack>

			<Button
				bottom={['16px', '32px']}
				boxShadow={() => getThemeColor()}
				display={showScroll ? 'flex' : 'none'}
				position='fixed'
				right={['16px', '32px']}
				size='sm'
				variant='solid'
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
