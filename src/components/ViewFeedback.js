import { Link } from 'react-router-dom'
import { db } from './Firebase'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { FadeLoader } from "react-spinners";
import {toast} from "react-toastify"
export default function ViewFeedback() {
	const [allTask, SetTask] = useState([])
	const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	useEffect(() => {
		const q = query(collection(db, 'Feedbacks'), orderBy('created', 'asc'))
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
		setLoad(true)
		if(window.confirm("Do you really want to delete ?")){
		const taskDocRef = doc(db, 'Feedbacks', id)
		try {
			await deleteDoc(taskDocRef)
			toast.success("Deleted Successfully!!")
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
	}
	const completeTask = async id => {
		// alert(id)
		setLoad(true)
		// update Status
		const taskDocRef = doc(db, 'Feedbacks', id)
		try {
			await updateDoc(taskDocRef, {
				taskcompletionStatus: 'Completed',
			})
			alert('Record Updated')
		} catch (err) {
			alert(err)
		}
	}

	return (
		<>
		 <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<div class="container mt-5">
				<div class="row mt-5 logincolor">
					<div class="col-md-12 mt-5 col-lg-12">
						<div class="mt-5">
							<h1 class="pb-4 p-1 text-white text-center">Feedback</h1>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row mt-4">
					<table className="table table-striped">
						<thead className="table-dark">
							<tr>
								<th>id</th>
								<th>Category</th>
								<th>Rooms</th>
								<th>Feedback</th>
								<th>UID</th>
								<th>Created_at</th>
							</tr>
						</thead>
						<tbody>
							{allTask.map((Feedbacks, index) => (
								<tr>
									<td>{index + 1}</td>
									<td>{Feedbacks.id}</td>
									<td>{Feedbacks.data.addCategory}</td>
									<td>{Feedbacks.data.addRoom}</td>

									<td>{Feedbacks.data.addFeedback}</td>
									<td>{getdate(Feedbacks.data.created)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
		</>
	)
}
