import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Button, useDisclosure } from '@chakra-ui/react'
import { FaChevronUp } from 'react-icons/fa'
import 'react-toastify/dist/ReactToastify.css'

import { getUserLocalStorage } from './utils/getUserLocalStorage'
import ErrorPage from './components/ErrorPage'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Auth from './components/Auth'
import About from './components/About'
import PostDetails from './components/PostDetails'
import Creator from './components/Creator'
import Tags from './components/Tags'
import Footer from './components/Footer'
import SavedPosts from './components/SavedPosts'
import TopPosts from './components/TopPosts'
import ScrollToTop from './components/common/ScrollToTop'
import LoadingScreen from './components/common/LoadingScreen/LoadingScreen'
import LoadingSync from './components/common/LoadingScreen/LoadingSync'

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
				boxShadow='blue'
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
