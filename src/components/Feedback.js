import { useState } from 'react'
import { db } from './Firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useEffect } from 'react'
import { FadeLoader } from "react-spinners";
import { toast } from 'react-toastify';
export default function Feedback() {
	const [load,setLoad]=useState(false)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	useEffect(() => {
		const jsFiles = ['/assets/assets/js/extra.js']

		jsFiles.forEach(filePath => {
			const script = document.createElement('script')
			script.src = filePath
			script.async = true
			document.body.appendChild(script)
		})

		return () => {
			jsFiles.forEach(filePath => {
				const script = document.querySelector(`[src="${filePath}"]`)
				if (script) {
					document.body.removeChild(script)
				}
			})
		}
	}, [])
	const [addCategory, setAddCategory] = useState('')
	const [addRoom, setAddRoom] = useState('')
	const [addFeedback, setAddFeedback] = useState('')
	const handleform = async data => {
		data.preventDefault()
		setLoad(true)
		try {
			await addDoc(collection(db, 'Feedbacks'), {
				addCategory: addCategory,
				addRoom: addRoom,
				addFeedback: addFeedback,

				created: Timestamp.now(),
			})
			toast.success('feedback sent')
			setTimeout(()=>{
				setLoad(false)
			},700)
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
				<div class="col-md-12 row mt-5">
					<div class="col-md-12 col-lg-12  mt-5">
						<div class="title-single-box mt-5 logincolor p-4 ">
							<h1 class="text-white text-center">Feedback</h1>
						</div>
					</div>

					<div className="container shadow mt-4   ">
						<div className="row col-md-12 mb-4 ">
							<form onSubmit={handleform}>
								<div className="form-group my-3">
									<label className="mb-2" for="category">
										Category
									</label>
									<input
										type="text"
										className="form-control "
										id="category"
										onChange={data => {
											setAddCategory(data.target.value)
										}}
										required
									></input>
								</div>
								<div className="form-group my-3">
									<label className="mb-2" for="room">
										Room
									</label>
									<input
										type="text"
										className="form-control"
										id="room"
										onChange={data => {
											setAddRoom(data.target.value)
										}}
										required
									></input>
								</div>
								<div class="form-group">
									<label className="mb-2" for="feedback">
										Feedback
									</label>
									<textarea
										class="form-control mb-4"
										id="feedback"
										rows={'10'}
										placeholder="enter feedback here"
										required
										onChange={data => {
											setAddFeedback(data.target.value)
										}}
									/>
								</div>
								<button type="submit" class="btn btn-a d-block my-3 mx-auto">
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div></>
	)
}
