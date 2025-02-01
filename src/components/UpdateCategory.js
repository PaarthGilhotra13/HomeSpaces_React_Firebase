import { db } from './Firebase'
import { collection, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import { FadeLoader } from "react-spinners";
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify';
export default function UpdateCategory() {
	const param = useParams()
	const nav = useNavigate()
	const [id, setId] = useState(param.id)
	useEffect(() => {
		getSingleTaskData()
	}, [])
	const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  

	const [add, setAdd] = useState('')
	const [taskcompletionStatus, settaskcompletionStatus] = useState('Pending')
	const getSingleTaskData = async () => {
		const taskDocRef = doc(db, 'addCategory', id)
		const taskSnap = await getDoc(taskDocRef)

		if (taskSnap.exists()) {
			let taskData = taskSnap.data()
			console.log('Document data:', taskSnap.data())
			setAdd(taskData.add)
			settaskcompletionStatus(taskData.taskcompletionStatus)
			setTimeout(()=>{
				setLoad(false)
			},700)
		} else {
			toast.error('No such document!')
			setTimeout(()=>{
				setLoad(false)
			},700)
		}
	}
	const handleform = async data => {
		setLoad(true)
		data.preventDefault()
		const taskDocRef = doc(db, 'addCategory', id)
		try {
			await updateDoc(taskDocRef, {
				add: add,
				taskcompletionStatus: taskcompletionStatus,
			})
			toast.success("Updation successfull")
			// setTimeout(() => {
			//     nav("/managecategory")
			// }, 3000);
			nav('/admin/managecategory')
		} catch (err) {
			// toast("Updation failed")
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
					<div class="col-md-12 col-lg-12 mt-5 logincolor pb-4">
						<div class="title-single-box mt-5">
							<h1 class="title-single text-center text-white">Update Property Type</h1>
						</div>
					</div>

					<div className="col-md-12 mt-5 shadow">
						<form onSubmit={handleform}>
							<div class="form-group col-md-12 ">
								<label for="addcategory"></label>
								<input
									type="text"
									class="form-control mb-4"
									id="addcategory"
									value={add}
									placeholder="enter property type here"
									required
									onChange={data => {
										setAdd(data.target.value)
									}}
								/>
							</div>
							<div className="mb-4">
								<button type="submit" class="btn btn-success p-2">
									Update
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div></>
	)
}
