import { useState } from 'react'
import { db } from './Firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FadeLoader } from "react-spinners";
export default function AddCity() {
	const [addCity, setAddCity] = useState('')
	const [addState, setAddState] = useState('')
	const [taskcompletionStatus, settaskcompletionStatus] = useState('Pending')
	const [load,setLoad]=useState(false)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	const handleform = async data => {
		data.preventDefault()
		setLoad(true)
		try {
			await addDoc(collection(db, 'addCity'), {
				addCity: addCity,
				addState: addState,
				taskcompletionStatus: taskcompletionStatus,
				created: Timestamp.now(),
			})
			setAddCity("")
			setAddState("")
			setTimeout(()=>{
				setLoad(false)
			},700)
			toast.success('city added')
			
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
				<div class="row mt-5 logincolor">
					{/* <div class="row mt-5 bg-success"> */}
					<div class="col-md-12 col-lg-12 mt-3">
						<div class="title-single-box ">
							<h1 class="title-single pb-3 text-center text-white">Add City & State</h1>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 my-4 shadow py-5 rounded">
						<form onSubmit={handleform}>
							<div class="form-group">
								<label className="py-3" for="addcity">
									City
								</label>
								<input
									type="text"
									class="form-control mb-4 rounded-pill"
									id="addcity"
									placeholder="enter city name here"
									required
									onChange={data => {
										setAddCity(data.target.value)
									}}
									value={addCity}
								/>
							</div>
							<div class="form-group">
								<label className="py-3" for="addstate">
									State
								</label>
								<input
									type="text"
									class="form-control mb-4 rounded-pill"
									id="addstate"
									placeholder="enter city name here"
									required
									value={addState}
									onChange={data => {
										setAddState(data.target.value)
									}}
								/>
							</div>
							<button type="submit" class="btn btn-success mx-auto d-block">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div></>
	)
}
