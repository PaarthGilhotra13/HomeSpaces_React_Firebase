import { Link } from 'react-router-dom'
import { db } from './Firebase'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc, where } from 'firebase/firestore'
import { FadeLoader } from "react-spinners";
export default function Mybooking() {
	const [allTask, SetTask] = useState([])
	const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	useEffect(() => {
		const q = query(collection(db, 'bookingRequests'),where("userId","==",sessionStorage.getItem("userId")), orderBy('created', 'asc'))
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
							<th>Property</th>
							<th>Booking Date</th>
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
								<td>{getdate(bookingRequests.data.created)}</td>
                                <td>{bookingRequests.data.taskcompletionStatus}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div></>
	)
}
