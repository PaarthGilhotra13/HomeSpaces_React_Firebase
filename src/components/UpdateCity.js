import { db } from './Firebase'
import { collection, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import { FadeLoader } from "react-spinners";
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify';
export default function UpdateCity() {
	const param = useParams()
	const nav = useNavigate()
	const [id, setId] = useState(param.id)
	const [addCity, setAddCity] = useState('')
	const [addState, setAddState] = useState('')
	const [taskcompletionStatus, settaskcompletionStatus] = useState('Pending')
	const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	useEffect(() => {
		getSingleTaskData()
	}, [])

	const getSingleTaskData = async () => {
		const taskDocRef = doc(db, 'addCity', id)
		const taskSnap = await getDoc(taskDocRef)

		if (taskSnap.exists()) {
			let taskData = taskSnap.data()
			console.log('Document data:', taskSnap.data())
			setAddCity(taskData.addCity)
			setAddState(taskData.addState)
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
		// setLoading(true)
		data.preventDefault()
		setLoad(true)
		const taskDocRef = doc(db, 'addCity', id)
		try {
			await updateDoc(taskDocRef, {
				addCity: addCity,
				addState: addState,
				taskcompletionStatus: taskcompletionStatus,
			})
			// toast("Updation successfull")
			// setTimeout(() => {
			//     nav("/managecategory")
			// }, 3000);
			setTimeout(()=>{
				setLoad(false)
			},700)
			toast.success("Updated successfully")
			nav('/admin/managecity')
		} catch (err) {
			// toast("Updation failed")
			toast.error("Something went Wrong")
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
					<div class="col-md-12 col-lg-12 logincolor pb-4 mt-5">
						<div class="title-single-box mt-5">
							<h1 class="title-single text-center text-white">Update City</h1>
						</div>
					</div>

					<div className="col-md-12 shadow mt-4">
						<form onSubmit={handleform}>
							<div class="form-group col-md-12">
								<label for="addcategory">City</label>
								<input
									type="text"
									class="form-control mb-4 mt-2"
									id="addcategory"
									value={addCity}
									placeholder="enter city name here"
									required
									onChange={data => {
										setAddCity(data.target.value)
									}}
								/>
							</div>
							<div class="form-group col-md-12">
								<label for="addcategory">State</label>
								<input
									type="text"
									class="form-control mb-4 mt-2"
									id="addcategory"
									value={addState}
									placeholder="enter city name here"
									required
									onChange={data => {
										setAddState(data.target.value)
									}}
								/>
							</div>
							<div className="mb-4">
								<button type="submit" class="btn btn-success">
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
