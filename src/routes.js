import { Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'



const routesConfig = [
	{ path: '/', element: <Home />, isIndex: true },
	{ path: '/about', element: <About /> },
	]

export const routes = routesConfig.map((route, index) => (
	<Route
		key={index}
		path={route.path}
		element={route.element}
		index={route.isIndex}
	/>
))
