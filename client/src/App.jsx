import { useState } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import { FaChevronUp } from 'react-icons/fa'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import About from './components/About'
import Auth from './components/Auth'
import LoadingScreen from './components/common/LoadingScreen/LoadingScreen'
import LoadingSync from './components/common/LoadingScreen/LoadingSync'
import ScrollToTop from './components/common/ScrollToTop'
import Creator from './components/Creator'
import ErrorPage from './components/ErrorPage'
import Footer from './components/Footer'
import Home from './components/Home'
import Navbar from './components/Navbar'
import PostDetails from './components/PostDetails'
import SavedPosts from './components/SavedPosts'
import Tags from './components/Tags'
import TopPosts from './components/TopPosts'
import getThemeColor from './utils/getThemeColor'
import { getUserLocalStorage } from './utils/getUserLocalStorage'

const App = () => {
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
			<LoadingSync />
			<ScrollToTop />
			<Navbar isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
			<Routes>
				<Route element={<Navigate replace to='/posts' />} path='/' />
				<Route element={<Home onOpen={onOpen} />} path='posts' />
				<Route element={<Home onOpen={onOpen} />} path='posts/search' />
				<Route element={<PostDetails />} path='posts/:id' />
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

			<Button
				bottom={['16px', '32px']}
				boxShadow={() => getThemeColor()}
				colorScheme='primary'
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

export default App
