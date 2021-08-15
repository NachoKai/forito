import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import ErrorPage from "./components/ErrorPage/ErrorPage"
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import About from "./components/About/About"
import PostDetails from "./components/PostDetails/PostDetails"
import { getUser } from "./utils/getUser"

const App = () => {
	const user = getUser()

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact component={() => <Redirect to="/posts" />} path="/" />
				<Route exact component={Home} path="/posts" />
				<Route exact component={Home} path="/posts/search" />
				<Route component={PostDetails} path="/posts/:id" />
				<Route
					exact
					component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
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
