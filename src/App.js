import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Master from './components/Master'
import About from './components/About'
import Home from './components/Home'
import Contact from './components/Contact'
import Login from './components/auth/Login'
import Property from './components/Property'
import Register from './components/auth/Register'
import PropertySingle from './components/PropertySingle'
import AddCategory from './components/AddCategory'
import UpdateCategory from './components/UpdateCategory'
import ManageCategory from './components/ManageCategory'
import AddCity from './components/AddCity'
import UpdateCity from './components/UpdateCity'
import Feedback from './components/Feedback'
import ManageCity from './components/ManageCity'
import Booking from './components/Booking'
import ViewContact from './components/VIewContact'
import City from './components/City'
import Dashboard from './components/Dashboard'
import ViewFeedback from './components/ViewFeedback'
import AddRoom from './components/AddRoom'
import ManageRoom from './components/ManageRoom'
// import Search from './components/Search';
import BookingRequest from './components/BookingRequest'
import UpdateRoom from './components/UpdateRoom'
import UserProfile from './components/UserProfile'
import ForgotPAssword from './components/ForgotPassword'
import OffcanvasExample from './components/Search'
import ResultPage from './components/Pages/ResultPage'
import MasterUser from './components/layout/MasterUser'
import Mybooking from './components/Mybooking'
import UpdateProfile from './components/UpdateProfile'

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Master />}>
						<Route path="/" element={<Home />}></Route>
						<Route path="/Contact" element={<Contact />}></Route>
						<Route path="/Home" element={<Home />}></Route>
						<Route path="/City" element={<City />}></Route>
						<Route path="/About" element={<About />}></Route>
						<Route path="/Login" element={<Login />}></Route>
						<Route path="/Register" element={<Register />}></Route>
						<Route path="/Property" element={<ResultPage />}></Route>
						<Route path='/viewProperty/:id' element={<ResultPage/>}/>
						<Route path="/PropertySingle/:id" element={<PropertySingle />}></Route>
						<Route path="/forgot" element={<ForgotPAssword />}></Route>
						<Route path="/bookingrequest" element={<BookingRequest/>}></Route>
						<Route path="/results/:id" element={<ResultPage />} exact></Route>
					</Route>
					<Route path='/admin' element={<MasterUser/>}>
						<Route path="/admin/bookingrequest/:id/:city" element={<BookingRequest />}></Route>
						<Route path="/admin/viewContact" element={<ViewContact />}></Route>
						<Route path="/admin/Addcategory" element={<AddCategory />}></Route>
						<Route
							path="/admin/Updatecategory/:id"
							element={<UpdateCategory />}
						></Route>
						<Route path="/admin/updateroom/:id" element={<UpdateRoom />}></Route>
						<Route path="/admin/updatecity/:id" element={<UpdateCity />}></Route>
						<Route path="/admin/managecategory" element={<ManageCategory />}></Route>
						<Route path="/admin/addcity" element={<AddCity />}></Route>
						<Route path="/admin/addroom" element={<AddRoom />}></Route>
						<Route path="/admin/manageroom" element={<ManageRoom />}></Route>
						<Route path="/admin/managecity" element={<ManageCity />}></Route>
						<Route path="/admin/feedback" element={<Feedback />}></Route>
						<Route path="/admin/booking" element={<Booking />}></Route>
						<Route path="/admin/dashboard" element={<Dashboard />}></Route>
						<Route path="/admin/viewfeedback" element={<ViewFeedback />}></Route>
						<Route path="/admin/user" element={<UserProfile />}></Route>
						<Route path='/admin/mybooking' element={<Mybooking/>}/>
						<Route path='/admin/profile' element={<UserProfile/>}/>
						<Route path='/admin/updateprofile' element={<UpdateProfile/>}/>
					</Route>
					<Route path="/search" element={<OffcanvasExample />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}
export default App

