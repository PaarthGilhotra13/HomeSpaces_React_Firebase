import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import 'react-responsive-modal/styles.css'
import Search from '../Search'
import useDisclosure from '../Hooks/useDisclosure'
import AuthPopup from '../auth/AuthPopup'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../Firebase'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { getAuth } from 'firebase/auth'
export default function Header() {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [showOffcanvas, setShowOffcanvas] = useState(false)
	const [view, setView] = useState('login')
	const navigate = useNavigate()
	const handleClose = () => {
		onClose()
		setShowOffcanvas(false)
	}

	const toggleOffcanvas = () => {
		setShowOffcanvas(!showOffcanvas)
	}
	const onNavigate = path => {
		navigate(path)
		onClose()
	}
	const onClickHandle = view => {
		setView(view)
		onOpen()
	}
	const [userType,setUserType]=useState(sessionStorage.getItem("userType"))
    const [userEmail,setUserEmail]=useState(sessionStorage.getItem("email"))
    const [item,setItem]=useState(0)
    const userId=sessionStorage.getItem("userId")
    // useEffect(()=>{
    //     if(userId !="" && userId!="null" && userId!=null && userId!="undefined" && userId!=undefined){
    //         getSingleTaskData()
    //     }
    // },[userId])
    //   const getSingleTaskData = async () => {
    //     const que = query(collection (db, 'Users'),where("userId","==",sessionStorage.getItem("userId")))
    //     onSnapshot(que,(querySnapshot) => {
    //         setUserType(querySnapshot.docs[0]?.data()?.userType)
    //         setUserEmail(querySnapshot.docs[0]?.data()?.email)
    //         // console.log(userType,userEmail, userId)
    //     })
    //   }

      const nav=useNavigate()
      const logout=()=>{
        if(window.confirm("Do you really want to Logout?")){
            toast.success("Logout Successfully!!")
            const auth=getAuth()
            auth.signOut()
            sessionStorage.clear()
            nav("/login")
        }
      }
	const[openMenu,setOpenMenu] = useState(false)

	return (
		<>
			<AuthPopup isopen={isOpen} onClose={onClose} view={view} componentProps={{ onNavigate }} />
			<Navbar className="bg-body-tertiary mb-3">
				<Container fluid>
					<Button variant="outline-success" onClick={toggleOffcanvas} className="ms-auto">
						Search
					</Button>
					<Offcanvas show={showOffcanvas} onHide={toggleOffcanvas} placement="end" style={{ width: '50%' }}>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title>HomeSpaces</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Search />
						</Offcanvas.Body>
					</Offcanvas>
				</Container>
			</Navbar>

			<nav class="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
				<div class="container">
					<button
						class="navbar-toggler collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarDefault"
						aria-controls="navbarDefault"
						aria-expanded="false"
						aria-label="Toggle navigation"
						onClick={()=>{setOpenMenu(!openMenu)}}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
					<Link class="navbar-brand text-brand" to="/home">
						Home<span class="color-b">Spaces</span>
					</Link>

					<div class="navbar-collapse collapse justify-content-center" id="navbarDefault">
						<ul class="navbar-nav">
							{
								!!userId?
								userType==1?
								<>
								<li class="nav-item">
									<Link class="nav-link " to="/admin/dashboard">
										Home
									</Link>
								</li>
								<li class="nav-item dropdown">
								<a href="#" className='nav-link'>
									Category
								</a>
								<div class="dropdown-menu">
									<Link class="dropdown-item " to="/admin/addcategory" onClick={handleClose}>
										Add Category
									</Link>
									<Link class="dropdown-item " to="/admin/managecategory" onClick={handleClose}>
										Manage Category
									</Link>
								</div>
							</li>
							<li class="nav-item dropdown">
								<a href="#" className='nav-link'>
									City
								</a>
								<div class="dropdown-menu">
								<Link class="dropdown-item " to="/admin/addcity" onClick={handleClose}>
									{' '}
									Add City
								</Link>
								<Link class="dropdown-item " to="/admin/managecity" onClick={handleClose}>
									Manage City
								</Link>
								</div>
							</li>
							<li class="nav-item dropdown">
								<a href="#" className='nav-link'>
									Room
								</a>
								<div class="dropdown-menu">
								<Link class="dropdown-item " to="/admin/addroom" onClick={handleClose}>
									Add Room
								</Link>
								<Link class="dropdown-item " to="/admin/manageroom" onClick={handleClose}>
									Manage Room
								</Link>
								</div>
							</li>
							<li class="nav-item dropdown">
									<a href="#" className='nav-link'>
										Enquiry
									</a>
									<div class="dropdown-menu">
									
									<Link class="dropdown-item " to="/admin/viewcontact " onClick={handleClose}>
										View Contact
									</Link>
								</div>
							</li>
							<li class="nav-item">
								<Link class="nav-link " to="/admin/booking" onClick={handleClose}>
									Booking
								</Link>
							</li>
								<li class="nav-item">
									<a href="#" class="nav-link" onClick={logout}>Logout</a>
								</li>
								</>
								:
								<>
								<li class="nav-item">
									<Link class="nav-link " to="/home">
										Home
									</Link>
								</li>

								<li class="nav-item">
									<Link class="nav-link " to="/about">
										About
									</Link>
								</li>

								<li class="nav-item">
									<Link class="nav-link " to="/Property">
										Property
									</Link>
								</li>

								<li class="nav-item">
									<Link class="nav-link " to="/contact">
										Contact
									</Link>
								</li>
								<li class="nav-item">
									<Link class="nav-link " to="/admin/mybooking">
										Booking
									</Link>
								</li>
								<li class="nav-item">
									<Link class="nav-link " to="/admin/profile">
										Profile
									</Link>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link" onClick={logout}>Logout</a>
								</li>
								</>
								:
								<>
								<li class="nav-item">
									<Link class="nav-link " to="/home">
										Home
									</Link>
								</li>

								<li class="nav-item">
									<Link class="nav-link " to="/about">
										About
									</Link>
								</li>

								<li class="nav-item">
									<Link class="nav-link " to="/Property">
										Property
									</Link>
								</li>

								<li class="nav-item">
									<Link class="nav-link " to="/contact">
										Contact
									</Link>
								</li>
								<li class="nav-item">
									<Link class="nav-link " to="/Login">
										Login
									</Link>
								</li>
								<li class="nav-item">
									<Link class="nav-link " to="/Register">
										Register
									</Link>
								</li>
								</>
							}
							
						</ul>
					</div>
					{userType!=1?
					<button
						type="submit"
						class="btn btn-light pe-3 "
						data-bs-target="#exampleModal"
						onClick={() => setShowOffcanvas(true)}
					>
					&nbsp;<i class="bi bi-search"></i>&nbsp;&nbsp;Search
					</button>
					:""}
				</div>
			</nav>
		</>
	)
}
