import { useState } from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Button } from "@chakra-ui/react"
import { FaChevronUp } from "react-icons/fa"
import "react-toastify/dist/ReactToastify.css"

import ErrorPage from "./components/ErrorPage"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Auth from "./components/Auth"
import About from "./components/About"
import PostDetails from "./components/PostDetails"
import Creator from "./components/Creator"
import Tags from "./components/Tags"
import Footer from "./components/Footer"
import SavedPosts from "./components/SavedPosts"
import { getUser } from "./utils/getUser"

const App = () => {
	const [showScroll, setShowScroll] = useState(false)
	const user = getUser()
	const userEmail = user?.result?.email

	const checkScrollTop = () => {
		if (!showScroll && window.pageYOffset > 400) {
			setShowScroll(true)
		} else if (showScroll && window.pageYOffset <= 400) {
			setShowScroll(false)
		}
	}

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	window.addEventListener("scroll", checkScrollTop)

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact component={() => <Redirect to="/posts" />} path="/" />
				<Route exact component={Home} path="/posts" />
				<Route exact component={Home} path="/posts/search" />
				<Route exact component={PostDetails} path="/posts/:id" />
				<Route exact component={Creator} path="/creators/:name" />
				<Route exact component={Tags} path="/tags/:name" />
				<Route
					exact
					component={() => (userEmail ? <SavedPosts /> : <Redirect to="/posts" />)}
					path="/saved"
				/>
				<Route
					exact
					component={() => (!userEmail ? <Auth /> : <Redirect to="/posts" />)}
					path="/auth"
				/>
				<Route exact component={About} path="/about" />
				<Route exact component={ErrorPage} path="*" />
			</Switch>
			<Button
				bottom={["16px", "32px"]}
				colorScheme="primary"
				display={showScroll ? "flex" : "none"}
				position="fixed"
				right={["16px", "32px"]}
				size="sm"
				variant="solid"
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
