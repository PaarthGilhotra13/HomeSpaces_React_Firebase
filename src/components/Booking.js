import { Link } from 'react-router-dom'
import { db } from './Firebase'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FadeLoader } from "react-spinners";
export default function Booking() {
	const [allTask, SetTask] = useState([])
	const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	useEffect(() => {
		const q = query(collection(db, 'bookingRequests'), orderBy('created', 'asc'))
		onSnapshot(q, querySnapshot => {
			// console.log(querySnapshot.docs)
			SetTask(
				querySnapshot.docs.map(doc => ({
					id: doc.id,
					data: doc.data(),
				})),
			)
		})
		setTimeout(()=>{
			setLoad(false)
		},700)
	}, [])
	const getdate = datetime => {
		const date = datetime.toDate().toString()
		const s = date.split(' ')
		console.log(s)
		const returndate = s[2] + '-' + s[1] + '-' + s[3]
		return returndate
	}
	const deleteHandle = async id => {
		const taskDocRef = doc(db, 'bookingRequests', id)
		try {
			await deleteDoc(taskDocRef)
		} catch (err) {
			toast.error("something went wrong")
		}
	}
	const completeTask = async id => {
		// alert(id)
		setLoad(true)
		// update Status
		const taskDocRef = doc(db, 'bookingRequests', id)
		try {
			await updateDoc(taskDocRef, {
				taskcompletionStatus: 'Completed',
			})
			toast.success('Record Updated')
			setTimeout(()=>{
				setLoad(false)
			},700)
		} catch (err) {
			toast.error("Something went wrong")
			setTimeout(()=>{
				setLoad(false)
			},700)
		}
	}
	const completeTask1 = async id => {
		// alert(id)
		setLoad(true)
		// update Status
		const taskDocRef = doc(db, 'bookingRequests', id)
		try {
			await updateDoc(taskDocRef, {
				taskcompletionStatus: 'Accepted',
			})
			setTimeout(()=>{
				setLoad(false)
			},700)
			toast.success('Record Updated')
		} catch (err) {
			toast.error("Something went wrong")
			setTimeout(()=>{
				setLoad(false)
			},700)
		}
	}
	const completeTask2 = async id => {
		// alert(id)
		setLoad(true)
		// update Status
		const taskDocRef = doc(db, 'bookingRequests', id)
		try {
			await updateDoc(taskDocRef, {
				taskcompletionStatus: 'Rejected',
			})
			toast.success('Record Updated')
			setTimeout(()=>{
				setLoad(false)
			},700)
		} catch (err) {
			toast.error("Something went wrong")
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
				<div class="row mt-5">
					<div class="col-md-12 mt-5 col-lg-12 ">
						<div class="title-single-box bg-light py-3 mt-5">
							<h1 class="title-single text-center pb-4">Bookings</h1>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-12 container mt-5">
				<table className="table table-striped ">
					<thead className="table-dark">
						<tr>
							<th>id</th>
							<th>City</th>
							<th>Room</th>
							<th>Booking Date</th>
							<th>Booking Status</th>
							<th>Created at</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{allTask.map((bookingRequests, index) => (
							<tr>
								<td>{index + 1}</td>
								<td>{bookingRequests.data.addCity}</td>
								<td>{bookingRequests.data.addRoomAddress}</td>
								<td>{bookingRequests.data.addDate}</td>

								<td>
									{bookingRequests.data.taskcompletionStatus}
									{bookingRequests.data.taskcompletionStatus != 'Pending' ? (
										''
									) : (
										<input type="checkbox" onChange={data => completeTask(bookingRequests.id)} />
									)}
								</td>
								<td>{getdate(bookingRequests.data.created)}</td>
								<td>
									{bookingRequests.data.taskcompletionStatus=="Pending"?
										<>
										<button
										type="submit"
										className="btn btn-success"
										onClick={() => {
											const confirmbox = window.confirm('DO YOU REALLY WANT TO ACCEPT?')
											if (confirmbox === true) {
												completeTask1(bookingRequests.id)
											}
										}}
									>
										Accept
									</button>
									&nbsp;
									<button
										type="submit"
										className="btn btn-warning"
										onClick={() => {
											const confirmbox = window.confirm('DO YOU REALLY WANT TO REJECT?')
											if (confirmbox === true) {
												completeTask2(bookingRequests.id)
											}
										}}
									>
										decline
									</button>
									&nbsp;
									{/* <button
										type="submit"
										className="btn btn-danger"
										onClick={() => {
											const confirmbox = window.confirm('DO YOU REALLY WANT TO DELETE?')
											if (confirmbox === true) {
												deleteHandle(bookingRequests.id)
											}
										}}
									>
										Delete
									</button> */}
										</>:
										bookingRequests.data.taskcompletionStatus
										
									}
									
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div></>
	)
}
