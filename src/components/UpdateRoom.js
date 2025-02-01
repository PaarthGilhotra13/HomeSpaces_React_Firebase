import { db, storage } from './Firebase'
import { collection, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore'

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { FadeLoader } from "react-spinners";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'react-toastify'
export default function UpdateRoom() {
	const param = useParams()
	const nav = useNavigate()
	const [id, setId] = useState(param.id)
	const [addCategory, setAddCategory] = useState('')
	const [addRoomAddress, setAddRoomAddress] = useState('')
	const [addState, setAddState] = useState('')
	const [addCity, setAddCity] = useState('')
	const [addRent, setAddRent] = useState('')
	const [addAccomodation, setAddAccomodation] = useState('')
	const [image, setImage] = useState('')
	const [image1, setImage1] = useState('')
	const [addDescription, setAddDesccription] = useState('')
	const [file, setFile] = useState(null)
	const [percent, setPercent] = useState(false)
	const [imageUrl, setImageUrl] = useState(null)
	const [taskcompletionStatus, settaskcompletionStatus] = useState('Pending')
	const [fileName, setFileName] = useState()
	const [prevFileName, setPrevFileName] = useState()
	const [file1, setFile1] = useState(null)
	const [percent1, setPercent1] = useState(false)
	const [imageUrl1, setImageUrl1] = useState(null)
	const [taskcompletionStatus1, settaskcompletionStatus1] = useState('Pending')
	const [fileName1, setFileName1] = useState()
	const [prevFileName1, setPrevFileName1] = useState()
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
		const taskDocRef = doc(db, 'AddRooms', id)
		const taskSnap = await getDoc(taskDocRef)

		if (taskSnap.exists()) {
			let taskData = taskSnap.data()
			console.log('Document data:', taskSnap.data())
			setAddCategory(taskData.addCategory)
			setAddRoomAddress(taskData.addRoomAddress)
			setAddCity(taskData.addCity)
			setAddState(taskData.addState)
			setAddRent(taskData.addRent)
			setAddAccomodation(taskData.addAccomodation)
			setAddDesccription(taskData.addDescription)
			setPrevFileName(taskData.fileName)
			setPrevFileName1(taskData.fileName1)
			setImage(taskData.image)
			setImage1(taskData.image1)
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
	const handleSubmit = async data => {
		// setLoading(true)

		data.preventDefault()
		if (!!file || !!file1) {
			if(!!file){
			uploadFile()
			}else{
				uploadFile1()
			}
		} else updateData()
	}

	async function updateData() {
		const taskDocRef = doc(db, 'AddRooms', id)
		try {
			let data = {
				addCategory: addCategory,
				addRoomAddress: addRoomAddress,
				addState: addState,
				addCity: addCity,
				addRent: addRent,
				addAccomodation: addAccomodation,
				taskcompletionStatus: taskcompletionStatus,
				addDescription: addDescription,
				image:image,
				image1:image1,
			}
			if (!!imageUrl) {
				data.image = imageUrl
				data.fileName = fileName
			} 
			if(!!imageUrl1){
				data.image1 = imageUrl1
				data.fileName1 = fileName1
			}
			console.log("data is ", data)
			await updateDoc(taskDocRef, data)
			nav('/admin/manageroom')
		} catch (err) {
			toast.error("Something went Wrong!!")
			setTimeout(()=>{
				setLoad(false)
			},700)
		}
	}
	useEffect(() => {
		if (!!imageUrl || !!imageUrl1  ) {
			if(!!imageUrl){
			deletePreviousImage()
			}else{
				deletePreviousImage1()
			}
			updateData()
		}
	}, [imageUrl, imageUrl1])
	function deletePreviousImage() {
		const fileRef = ref(storage, 'files/' + prevFileName)
		deleteObject(fileRef)
			.then(function () {
				// File deleted successfully
				console.log('Prev File Deleted')
			})
			.catch(function (error) {
				// Some Error occurred
				console.log('Error deleting previous image')
			})
	}
	function deletePreviousImage1() {
		const fileRef1 = ref(storage, 'files/' + prevFileName1)
		deleteObject(fileRef1)
			.then(function () {
				// File deleted successfully
				console.log('Prev File Deleted')
			})
			.catch(function (error) {
				// Some Error occurred
				console.log('Error deleting previous image')
			})
	}
	const uploadFile = () => {
		if (!file ) {
			alert('Please upload an image first!')
		}
		const fileName = `${Date.now()}-${file.name}`
		const storageRef = ref(storage, `/files/${fileName}`)
		const uploadTask = uploadBytesResumable(storageRef, file)
		uploadTask.on(
			'state_changed',
			snapshot => {
				const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
				setPercent(percent)
			},
			err => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(url => {
					setImageUrl(url)
					setFileName(fileName)
					setImage(url)
				})
			},
		)
	}
	const uploadFile1 = () => {
		if (!file1 ) {
			alert('Please upload an image first!')
		}
		const fileName1 = `${Date.now()}-${file1.name}`
		const storageRef1 = ref(storage, `/files/${fileName1}`)
		const uploadTask1 = uploadBytesResumable(storageRef1, file1)
		uploadTask1.on(
			'state_changed',
			snapshot => {
				const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
				setPercent(percent)
			},
			err => console.log(err),
			() => {
				getDownloadURL(uploadTask1.snapshot.ref).then(url1 => {
					setImageUrl1(url1)
					setFileName1(fileName1)
					setImage1(url1)
				})
			},
		)
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
							<h1 class="title-single text-center text-white">Update Property</h1>
						</div>
					</div>

					<div className="col-md-12 shadow mt-4">
						<form onSubmit={handleSubmit}>
							<div class="form-group col-md-12">
								<label for="addcategory">Property Type </label>
								<input
									type="text"
									class="form-control mb-4 mt-2"
									id="addcategory"
									value={addCategory}
									placeholder="enter property type here"
									required
									onChange={data => {
										setAddCategory(data.target.value)
									}}
								/>
							</div>
							<div class="form-group col-md-12">
								<label for="room">Property Address</label>
								<input
									type="text"
									class="form-control mb-4 mt-2"
									id="room"
									value={addRoomAddress}
									placeholder="Enter Property Address here"
									required
									onChange={data => {
										setAddRoomAddress(data.target.value)
									}}
								/>
							</div>
							<div class="form-group col-md-12">
								<label for="city">City</label>
								<input
									type="text"
									class="form-control mb-4 mt-2"
									id="city"
									value={addCity}
									placeholder="enter city name here"
									required
									onChange={data => {
										setAddCity(data.target.value)
									}}
								/>
							</div>
							<div class="form-group col-md-12">
								<label for="accomodation">Accomodation</label>
								<input
									type="text"
									class="form-control mb-4 mt-2"
									id="accomodation"
									value={addAccomodation}
									placeholder="enter accomodation name here"
									required
									onChange={data => {
										setAddAccomodation(data.target.value)
									}}
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="img">Image1</label>
								<input
									type="file"
									class="form-control mb-4 mt-2"
									id="img"
									placeholder="enter Image name here"
									
									onChange={data => {
										setFile(data.target.files[0])
									}}
								/>
							</div>
							<img src={image} width={100} height={100}></img>
							<div class="form-group col-md-6">
								<label for="img">Image2</label>
								<input
									type="file"
									class="form-control mb-4 mt-2"
									id="img"
									placeholder="enter Image name here"
									
									onChange={data => {
										setFile1(data.target.files[0])
									}}
								/>
							</div>
							<img src={image1} width={100} height={100}></img>
							<div class="form-group col-md-12">
								<label for="desc">Description</label>
								<textarea
									type="text"
									class="form-control mb-4 mt-2"
									id="desc"
									value={addDescription}
									rows={5}
									placeholder="enter Description name here"
									required
									onChange={data => {
										setAddDesccription(data.target.value)
									}}
								/>
							</div>
							<div class="form-group col-md-12">
								<label for="addcategory">Status</label>
								<input
									type="text"
									class="form-control mb-4 mt-2"
									id="addcategory"
									placeholder="enter status name here"
									required
								/>
							</div>
							<div className="mb-4">
								<button type="submit" class="btn btn-success d-block mx-auto">
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
