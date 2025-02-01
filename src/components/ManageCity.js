import { Link } from 'react-router-dom'
import { db } from './Firebase'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { FadeLoader } from "react-spinners";
import {toast} from "react-toastify"
export default function ManageCity() {
	const [allTask, SetTask] = useState([])
	const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	useEffect(() => {
		const q = query(collection(db, 'addCity'), orderBy('created', 'asc'))
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
		const taskDocRef = doc(db, 'addCity', id)
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
					<div class="col-md-12 mt-5 col-lg-12">
						<div class="mt-5">
							<h1 class="pb-4 p-1 text-center">Manage City</h1>
						</div>
					</div>

					<div className="col-md-12">
						<table className="table table-striped">
							<thead className="table-dark">
								<tr>
									<th>id</th>
									<th>City name</th>
									<th>State</th>
									<th>Created At</th>

									<th>Status </th>
									<th>Action </th>
								</tr>
							</thead>
							<tbody>
								{allTask.map((addCity, index) => (
									<tr>
										<td>{index + 1}</td>
										<td>{addCity.data.addCity}</td>
										<td>{addCity.data.addState}</td>
										<td>{addCity.data.taskcompletionStatus}</td>
										<td>{getdate(addCity.data.created)}</td>
										<td>
											<Link to={'/admin/updatecity/' + addCity.id}>
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
														deleteHandle(addCity.id)
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
                    {data.map((element,index)=>(
                             <tr >
                    
                             <td>{index+1}</td>
                             <td>{element.city}</td>
                             <td>{element.state}</td>
                             <td>{element.date}</td>

                             <td>
                             <Link to='/updatecity'> <i class="fa fa-edit fa-2x "></i></Link>&nbsp;&nbsp;

                                                                                        
                                <i class="fa fa-trash-o fa-2x "></i>
                            </td>
                            
                         </tr>
                    ))
                    }
               
                </tbody> */}
						</table>
					</div>
				</div>
			</div>
		</div></>
	)
}
