import { Link } from 'react-router-dom'
import { db } from './Firebase'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { FadeLoader } from "react-spinners";
import {toast} from "react-toastify"
export default function ViewContact() {
	const [allTask, SetTask] = useState([])
	const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	useEffect(() => {
		const q = query(collection(db, 'Contacts'), orderBy('created', 'asc'))
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
		const taskDocRef = doc(db, 'Contacts', id)
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
	const handleEmailButtonClick = data => {
		alert(data)
		const mailtoLink = `mailto:${data}`
		window.location.href = mailtoLink
	}

	return (
		<>
		 <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<div class="container mt-5">
				<div class="row mt-5">
					<div class="col-md-12 col-lg-12 mt-2 logincolor">
						<div class="mt-3 pb-3 ">
							<h1 class="text-white text-center"> View Contact</h1>
						</div>
					</div>
				</div>
			</div>
			<div className="container mt-4">
				<div className="row">
					<table className="table table-striped">
						<thead className="table-dark">
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Email</th>
								<th>Subject</th>
								<th>Message</th>
								<th>Uid</th>
								<th>Revert</th>
								<th>Created_at</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{allTask.map((Contacts, index) => (
								<tr>
									<td>{index + 1}</td>
									<td>{Contacts.data.addName}</td>
									<td>{Contacts.data.addEmail}</td>
									<td>{Contacts.data.addSubject}</td>

									<td>{Contacts.data.addMessage}</td>
									<td>1</td>
									<td>{Contacts.data.taskcompletionStatus}</td>
									<td>{getdate(Contacts.data.created)}</td>
									<td>
										<button
											className="btn btn-dark"
											onClick={e => handleEmailButtonClick(Contacts.data.addEmail)}
										>
											click
										</button>{' '}
										&nbsp;&nbsp;
										<button
											type="submit"
											className="btn btn-danger"
											onClick={() => {
												const confirmbox = window.confirm('DO YOU REALLY WANT TO DELETE?')
												if (confirmbox === true) {
													deleteHandle(Contacts.id)
												}
											}}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div></>
	)
}
