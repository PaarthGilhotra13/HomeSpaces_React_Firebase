import { Link } from 'react-router-dom'
import { db } from './Firebase'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { FadeLoader } from "react-spinners";
import { toast } from 'react-toastify';
export default function ManageRoom() {
	const [allTask, SetTask] = useState([])
	const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	useEffect(() => {
		const q = query(collection(db, 'AddRooms'), orderBy('created', 'asc'))
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
		const taskDocRef = doc(db, 'AddRooms', id)
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
		const taskDocRef = doc(db, 'AddRooms', id)
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

	return (
		<>
		 <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<div class="container mt-5">
				<div class="row mt-5">
					<div class="col-md-12 col-lg-12 mt-5">
						<div class="title-single-box mt-5">
							<h1 class="title-single text-center">Manage Property</h1>
						</div>
					</div>
				</div>
			</div>
			<div className="row col-md-12 row ps-4 mt-4 table-responsive">
				<table width="100%" className="table table-striped table-bordered border-dark">
					<thead className="table-dark">
						<tr>
							<th>id</th>
							<th>Category Name</th>
							<th>Property Address</th>
							<th>City</th>
							<th>State</th>
							<th>Rent/Cost</th>
							<th>Accomodation</th>
							<th>Image1</th>
							<th>Image2</th>
							<th width="200px">Descripiton</th>
							<th>Status</th>
							<th>Created_at</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{allTask.map((AddRooms, index) => (
							<tr >
								<td>{index + 1}</td>
								<td>{AddRooms.data.addCategory}</td>
								<td>{AddRooms.data.addRoomAddress}</td>
								<td>{AddRooms.data.addCity}</td>
								<td>{AddRooms.data.addState}</td>
								<td>{AddRooms.data.addRent}</td>
								<td>{AddRooms.data.addAccomodation}</td>
								<td>
									<img src={AddRooms.data.image} style={{ width: '100px' }}></img>
								</td>
								<td>
									<img src={AddRooms.data.image1} style={{ width: '100px' }}></img>
								</td>
								<td >{AddRooms.data.addDescription}</td>
								<td>
									{AddRooms.data.taskcompletionStatus}
									{AddRooms.data.taskcompletionStatus != 'Pending' ? (
										''
									) : (
										<input type="checkbox" onChange={data => completeTask(AddRooms.id)} />
									)}
								</td>
								<td>{getdate(AddRooms.data.created)}</td>
								<td>
									<Link to={'/admin/updateroom/' + AddRooms.id}>
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
												deleteHandle(AddRooms.id)
											}
										}}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
					{/* <tbody>
        <tr>
            <th>1</th>
            <th>Ac Room</th>
            <th>WS-86,Basti Sheikh</th>
            <th>Jalandhar</th>
            <th>$20</th>
            <th>Accomodation</th>
            <th><img src="/assets/assets/img/plan2.jpg" className="img-fluid"></img></th>
            <th>providing best facility</th>
            <th>unbooked</th>
            <th>1/1/2023</th>
            <td>
                            <Link to="/updateroom">
                                <i className="fa fa-edit text-success fa-2x"></i>
                            </Link> &nbsp;
                                <i className="fa fa-trash text-danger fa-2x"></i>
                            
                        </td>

        </tr>
        </tbody>
         */}
				</table>
			</div>
		</div></>
	)
}
