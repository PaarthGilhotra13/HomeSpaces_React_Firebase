import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FadeLoader } from "react-spinners";
import { db } from './Firebase'
import {  doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify';
export default function PropertySingle() {
	const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	const param = useParams()
	const nav = useNavigate()
	const [addCategory, setAddCategory] = useState('')
	const [addRoomAddress, setAddRoomAddress] = useState('')
	const [addState, setAddState] = useState('')
	const [addCity, setAddCity] = useState('')
	const [addRent, setAddRent] = useState('')
	const [addAccomodation, setAddAccomodation] = useState('')
	const [image, setImage] = useState('')
	const [image2, setImage2] = useState('')
	const [addDescription, setAddDesccription] = useState('')
	const [file, setFile] = useState(null)
	const [percent, setPercent] = useState(false)
	const [imageUrl, setImageUrl] = useState(null)
	const [taskcompletionStatus, settaskcompletionStatus] = useState('Pending')
	const [fileName, setFileName] = useState()
	const [prevFileName, setPrevFileName] = useState()
	const [id, setId] = useState(param.id)
	const [status,setStatus]=useState()
	useEffect(() => {
		getSingleTaskData()
	}, [id])

	const getSingleTaskData = async () => {
		const taskDocRef = doc(db, 'AddRooms', id)
		const taskSnap = await getDoc(taskDocRef)
		if (taskSnap.exists()) {
			let taskData = taskSnap.data()
			console.log('Document data:', taskSnap.data())
			setAddCategory(taskData.addCategory)
			setAddRoomAddress(taskData.addRoomAddress)
			setAddCity(taskData.addCity)
			setAddState(taskData.addState)
			setAddRent(taskData.addRent)
			setAddAccomodation(taskData.addAccomodation)
			setAddDesccription(taskData.addDescription)
			setPrevFileName(taskData.fileName)
			setImage(taskData.image)
			setImage2(taskData.image2)
			settaskcompletionStatus(taskData.taskcompletionStatus)
			setStatus(taskData.status)
			setTimeout(()=>{
				setLoad(false)
			},700)
		} else {
			toast.error('No such document!')
		}
	}
	return (
		<>
		 <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<section class="intro-single">
				<div class="container">
					<div class="row">
						<div class="col-md-12 col-lg-8">
							<div class="title-single-box">
								<h1 class="title-single">{addRoomAddress}</h1>
								<span class="color-text-a">{addCity} | {addState}</span>
							</div>
						</div>
						<div className='col-md-2 offset-md-2'>
							{status=="Pending"?
							<Link className='btn btn-success' to={"/admin/bookingrequest/"+addRoomAddress+"/"+addCity}>Book</Link>
							:
							status}
						</div>
					</div>
				</div>
			</section>
			<section class="property-single nav-arrow-b">
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-lg-8">
						<div id="carouselExample" class="carousel slide">
							<div class="carousel-inner">
								<div class="carousel-item active">
								<img src={image} class="d-block w-100" alt="..." style={{height:"450px"}}/>
								</div>
								<div class="carousel-item">
								<img src={image} class="d-block w-100" alt="..." style={{height:"450px"}}/>
								</div>
							</div>
							<button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
								<span class="carousel-control-prev-icon" aria-hidden="true"></span>
								<span class="visually-hidden">Previous</span>
							</button>
							<button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
								<span class="carousel-control-next-icon" aria-hidden="true"></span>
								<span class="visually-hidden">Next</span>
							</button>
							</div>
							
						</div>
					</div>

					<div class="row">
						<div class="col-sm-12">
							<div class="row justify-content-between">
								<div class="col-md-5 col-lg-4">
									<div class="property-price d-flex justify-content-center foo">
										<div class="card-header-c d-flex">
											<div class="card-box-ico">
												<span class="bi bi-cash">&#8377;</span>
											</div>
											<div class="card-title-c align-self-center">
												<h5 class="title-c">{addRent}</h5>
											</div>
										</div>
									</div>
									<div class="property-summary">
										<div class="row">
											<div class="col-sm-12">
												<div class="title-box-d section-t4">
													<h3 class="title-d">Quick Summary</h3>
												</div>
											</div>
										</div>
										<div class="summary-list">
											<ul class="list">
												<li class="d-flex justify-content-between">
													<strong>Location:</strong>
													<span>{addRoomAddress}</span>
												</li>
												<li class="d-flex justify-content-between">
													<strong>Property Accomodation:</strong>
													<span>{addAccomodation}</span>
												</li>
												<li class="d-flex justify-content-between">
													<strong>Status:</strong>
													<span>{status}</span>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="col-md-7 col-lg-7 section-md-t3">
									<div class="row">
										<div class="col-sm-12">
											<div class="title-box-d">
												<h3 class="title-d">Property Description</h3>
											</div>
										</div>
									</div>
									<div class="property-description">
										<p class="description color-text-a">
											{addDescription}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div></>
	)
}
