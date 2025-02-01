import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { db, storage } from './Firebase'

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot, doc, getDoc, where } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FadeLoader } from "react-spinners";
export default function AddRoom() {
	const nav = useNavigate()
	const [add, setAddCategory] = useState('')
	const [addRoomAddress, setAddRoomAddress] = useState('')
	const [addState, setAddState] = useState('')
	const [addCity, setAddCity] = useState('')
	const [addRent, setAddRent] = useState('')
	const [addAccomodation, setAddAccomodation] = useState('')
	const [addDescription, setAddDesccription] = useState('')
	const [file, setFile] = useState(null)
	const [fileName, setFileName] = useState(null)
	const [percent, setPercent] = useState(false)
	const [imageUrl, setImageUrl] = useState(null)
	const [file1, setFile1] = useState(null)
	const [fileName1, setFileName1] = useState(null)
	const [percent1, setPercent1] = useState(false)
	const [imageUrl1, setImageUrl1] = useState(null)
	const [taskcompletionStatus, settaskcompletionStatus] = useState('Pending')
	const [allCategory, SetCategory] = useState([])
	const [allCity, SetCity] = useState([])
	const [load,setLoad]=useState(false)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	const getallcategory = () => {
		const q = query(collection(db, 'addCategory'), orderBy('created', 'asc'))
		onSnapshot(q, querySnapshot => {
			// console.log(querySnapshot.docs)
			SetCategory(
				querySnapshot.docs.map(doc => ({
					id: doc.id,
					data: doc.data(),
				})),
			)
		})
	}
	const getallcity = () => {
		const q = query(collection(db, 'addCity'), orderBy('created', 'asc'))
		onSnapshot(q, querySnapshot => {
			SetCity(
				querySnapshot.docs.map(doc => ({
					id: doc.id,
					data: doc.data(),
				})),
			)
		})
	}

	const handleform = async data => {
		data.preventDefault()
		uploadFile()
	}
	const uploadFile = () => {
		if (!file || !file1) {
			alert('Please upload an image first!')
		}
		const fileName = `${Date.now()}-${file.name}`
		const storageRef = ref(storage, `/files/${fileName}`)
		const uploadTask = uploadBytesResumable(storageRef, file)
		uploadTask.on(
			'state_changed',
			snapshot => {
				const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
				// update progress
				setPercent(percent)
			},
			err => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(url => {
					console.log('URL', url)
					// setFileName(fileName)
					setImageUrl(url)
				})
			},
		)
		const fileName1 = `${Date.now()}-${file1.name}`
		const storageRef1 = ref(storage, `/files/${fileName1}`)
		const uploadTask1 = uploadBytesResumable(storageRef1, file1)
		uploadTask1.on(
			'state_changed',
			snapshot => {
				const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
				setPercent1(percent)
			},
			err => console.log(err),
			() => {
				getDownloadURL(uploadTask1.snapshot.ref).then(url => {
					console.log('URL', url)
					// setFileName1(fileName1)
					setImageUrl1(url)
				})
			},
		)
	}
	const saveData = async () => {
		setLoad(true)
		try {
			await addDoc(collection(db, 'AddRooms'), {
				addCategory: add,
				addRoomAddress: addRoomAddress,
				addState: addState,
				addCity: addCity,
				addRent: addRent,
				addAccomodation: addAccomodation,
				taskcompletionStatus: taskcompletionStatus,
				addDescription: addDescription,
				image1:imageUrl1,
				image: imageUrl,
				fileName: fileName,
				status:"Pending",
				created: Timestamp.now(),
			})
			toast.success('Data submitted successfully!!')
			setAddAccomodation("")
			setAddCategory("")
			setAddCity("")
			setAddDesccription("")
			setAddRent("")
			setAddRoomAddress("")
			setAddState("")
			setFile({})
			setFile1({})
			setFileName("")
			setFileName1("")
			setImageUrl("")
			setImageUrl1("")
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

	useEffect(() => {
		getallcategory()
		getallcity()
		if (!!imageUrl && !!imageUrl1) saveData()
	}, [imageUrl, imageUrl1])

	return (
		<>
		 <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<div class="container logincolor">
				<div class="row mt-5">
					<div class="col-md-12 col-lg-12 mt-3">
						<div class="title-single-box ">
							<h1 class="title-single text-center pb-3 text-white"> Add Room</h1>
						</div>
					</div>
				</div>
			</div>

			<div className="container p-4 mx-auto shadow my-4 ">
				<form onSubmit={handleform}>
					<div class="form-group col-md-12 ">
						<label for="name" className="h5 ">
							Category Name
						</label>
						<select className="form-control" value={add} onChange={data => setAddCategory(data.target.value)}>
							<option>Select Category</option>
							{allCategory.map(addCategory => (
								<option>{addCategory.data.add}</option>
							))}
						</select>
					</div>
					<div class="form-group col-md-12">
						<label for="exampleInputEmail1 " className="h5 ">
							Property address
						</label>
						<input
							type="text"
							class="form-control mt-3"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							placeholder="Enter Property address"
							required
							value={addRoomAddress}
							onChange={data => {
								setAddRoomAddress(data.target.value)
							}}
						/>
					</div>
					<div className="form-gropu row">
						<div class="form-group col-md-4">
							<label for="name" className="h5 my-3 ">
								City
							</label>
							<select className="form-control" value={addCity} onChange={(data) => {setAddCity(data.target.value)}}>
								<option>Select City</option>
								{allCity.map(addcity => (
									<option>{addcity.data.addCity}</option>
								))}
							</select>
						</div>
						<div class="form-group col-md-4">
							<label for="name" className="h5 my-3 ">
								State
							</label>
							<select className="form-control" readonly value={addState} onChange={(data) => {setAddState(data.target.value)}}>
								<option>Select State</option>
								{allCity.map(addcity => (
									<option selected={addCity==addcity.data.addCity}>{addcity.data.addState}</option>
								))}
							</select>
						</div>
						<div class="form-group col-md-3">
							<label for="name" className="h5 my-3">
								Rent/Cost
							</label>
							<input
								type="text"
								class="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Rent/cost of the property"
								required
								value={addRent}
								onChange={data => {
									setAddRent(data.target.value)
								}}
							/>
						</div>

						<div class="form-group col-md">
							<label for="name" className="h5 my-3">
								Accomodation
							</label>
							<input
								type="text"
								class="form-control "
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Accomodation of the room"
								required
								value={addAccomodation}
								onChange={data => {
									setAddAccomodation(data.target.value)
								}}
							/>
						</div>

						<div class="form-group row col-md-12"></div>
						<label for="exampleInputPassword1" className="h5 my-3 ">
							Image1
						</label>
						<input
							type="file"
							class="form-control"
							id="exampleInputPassword1"
							placeholder="Password"
							required
							value={fileName}
							onChange={(e) =>{
								// console.log(e.target.files[0])
								setFile(e.target.files[0])
								setFileName(e.target.value)
							}}
						/>
					
						<div class="form-group row col-md-12"></div>
						<label for="exampleInputPassword1" className="h5 my-3 ">
							Image2
						</label>
						<input
							type="file"
							class="form-control"
							id="exampleInputPassword1"
							placeholder="Password"
							required
							value={fileName1}
							onChange={(e)=>{
								// console.log(e.target.files[0])
								setFile1(e.target.files[0])
								setFileName1(e.target.value)
							}
							}
						/>
					</div>
					<div class="form-group row col-md-12">
						<label for="exampleInputPassword1" className="h5 my-3 ">
							{' '}
							Description
						</label>
						<textarea
							type=""
							class="form-control"
							id="exampleInputPassword1"
							placeholder="Enter the description"
							rows={10}
							required
							onChange={data => {
								setAddDesccription(data.target.value)
							}}
							value={addDescription}
						/>
					</div>
					<div className="py-3">
						<button type="submit" class="btn btn-success d-block mx-auto ">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div></>
	)
}
