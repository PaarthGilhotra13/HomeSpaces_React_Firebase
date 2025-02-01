import { Outlet } from 'react-router-dom'
import Header from './layout/Header'

import Footer from './layout/Footer'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {ClipLoader} from "react-spinners"
export default function Master() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
			<ToastContainer/>
		</>
	)
}
