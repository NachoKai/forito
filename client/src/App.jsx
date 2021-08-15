import { BrowserRouter, Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import ErrorPage from "./components/ErrorPage/ErrorPage"
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import About from "./components/About/About"
import Paginator from "./components/common/Paginator"

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact component={Home} path="/" />
				<Route exact component={Auth} path="/auth" />
				<Route exact component={About} path="/about" />
				<Route exact component={Paginator} path="/paginator" />
				<Route exact component={ErrorPage} path="*" />
			</Switch>
			<ToastContainer />
		</BrowserRouter>
	)
}

export default App
