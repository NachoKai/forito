import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import ErrorPage from "./components/ErrorPage"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Auth from "./components/Auth"
import About from "./components/About"
import PostDetails from "./components/PostDetails"
import { getUser } from "./utils/getUser"
import Creator from "./components/Creator"
import Tags from "./components/Tags"

const App = () => {
	const user = getUser()

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
					component={() => (!user?.result ? <Auth /> : <Redirect to="/posts" />)}
					path="/auth"
				/>
				<Route exact component={About} path="/about" />
				<Route exact component={ErrorPage} path="*" />
			</Switch>
			<ToastContainer />
		</BrowserRouter>
	)
}

export default App
