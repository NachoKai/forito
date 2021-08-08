import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { getPosts } from "./redux/posts"
import ErrorPage from "./components/ErrorPage/ErrorPage"
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"

const App = () => {
	const dispatch = useDispatch()
	const [currentId, setCurrentId] = useState(null)

	useEffect(() => {
		dispatch(getPosts())
	}, [currentId, dispatch])

	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path="/auth">
					<Auth />
				</Route>
				<Route exact path="/">
					<Home currentId={currentId} setCurrentId={setCurrentId} />
				</Route>
				<Route path="*">
					<ErrorPage />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
