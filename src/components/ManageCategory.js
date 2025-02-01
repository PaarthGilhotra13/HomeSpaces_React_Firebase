import { Link } from 'react-router-dom'
import { db } from './Firebase'
import { useState, useEffect } from 'react'
import { FadeLoader } from "react-spinners";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify';
export default function ManageCategory() {
	const [allTask, SetTask] = useState([])
	const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	useEffect(() => {
		const q = query(collection(db, 'addCategory'), orderBy('created', 'asc'))
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
		const taskDocRef = doc(db, 'addCategory', id)
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
	return (
		<>
		 <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<div class="container mt-5">
				<div class="row mt-5 bg-light">
					<div class="col-md-12 col-lg-12 mt-3">
						<div class="title-single-box ">
							<h1 class="title-single pb-3 text-center">Manage Property Type</h1>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 my-5">
						<table className="table table-striped ">
							<thead className="table-dark">
								<tr>
									<th>id</th>
									<th>Category name</th>
									<th>Status</th>
									<th>Created At</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{allTask.map((addCategory, index) => (
									<tr>
										<td>{index + 1}</td>
										<td>{addCategory.data.add}</td>
										<td>{addCategory.data.taskcompletionStatus}</td>
										<td>{getdate(addCategory.data.created)}</td>
										<td>
											<Link to={'/admin/Updatecategory/' + addCategory.id}>
												{' '}
												<button className="btn btn-success">Edit</button>
											</Link>
											&nbsp;&nbsp;&nbsp;
											<button
												type="submit"
												className="btn btn-danger"
												onClick={() => {
													const confirmbox = window.confirm('DO YOU REALLY WANT TO DELETE?')
													if (confirmbox === true) {
														deleteHandle(addCategory.id)
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
			</div>
		</div></>
	)
}
