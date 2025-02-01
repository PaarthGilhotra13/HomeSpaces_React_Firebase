import { useState } from 'react'
import { db } from './Firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FadeLoader } from "react-spinners";
export default function BookingRequest() {
	const [load,setLoad]=useState(false)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  const nav=useNavigate()
  
	useEffect(() => {
		const jsFiles = ['/assets/assets/js/extra.js']

		jsFiles.forEach(filePath => {
			const script = document.createElement('script')
			script.src = filePath
			script.async = true
			document.body.appendChild(script)
		})

		return () => {
			jsFiles.forEach(filePath => {
				const script = document.querySelector(`[src="${filePath}"]`)
				if (script) {
					document.body.removeChild(script)
				}
			})
		}
	}, [])
	const [addDate, setDate] = useState('')
	const [taskcompletionStatus, settaskcompletionStatus] = useState('Pending')
	const param=useParams()
	const id=param.id
	const city=param.city
	const handleform = async data => {
		data.preventDefault()
		setLoad(true)
		try {
			await addDoc(collection(db, 'bookingRequests'), {
				addRoomAddress: id,
				taskcompletionStatus: taskcompletionStatus,
				addCity: city,
				addDate: addDate,
				userId:sessionStorage.getItem("userId"),
				created: Timestamp.now(),
			})
			toast.success("Booked Successfully!!")
			setTimeout(()=>{
				nav("/admin/mybooking")
			},700)
		} catch (err) {
			toast.error("Something went wrong!!")
			setTimeout(()=>{
				setLoad(false)
			},700)
		}
	}
	return (
		<>
		 <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<div class="container mt-5">
				<div class="col-md-12 row mt-5">
					<div class="col-md-12 col-lg-12 mt-5">
						<div class="title-single-box mt-5 logincolor p-4 ">
							<h1 class="text-white text-center">Booking</h1>
						</div>
					</div>
					<div className="container shadow mt-4   ">
						<div className="row col-md-12 mb-4 ">
							<form onSubmit={handleform}>
								<div class="form-group">
									<label for="date" className="mb-2 me-2">
										Choose Date
									</label>
									<input
										type="date"
										id="date"
										className='form-control'
										onChange={data => {
											setDate(data.target.value)
										}}
									/>
								</div>
								<button type="submit" class="btn btn-success mt-3 mx-auto d-block">
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div></>
	)
}
