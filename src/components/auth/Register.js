import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, storage } from '../Firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { collection, addDoc, Timestamp, setDoc, doc } from 'firebase/firestore'
import { FadeLoader } from "react-spinners";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase'
import CustomInput from '../layout/CustomInput'
import {toast} from "react-toastify"
export default function Register({ onNavigate }) {
	const nav = useNavigate()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [contact, setContact] = useState('')
	const [zip, setZip] = useState('')
	const [file, setFile] = useState(null)
	const [fileName, setFileName] = useState(null)
	const [image, setImage] = useState('')
	const [address, setAddress] = useState('')
	const [gender, setGender] = useState('')
	const [password, setPassword] = useState('')
	const [terms, setTerms] = useState('')
	const [taskcompletionStatus, settaskcompletionStatus] = useState('Pending')
	const [load,setLoad]=useState(false)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	const handleSubmit = async e => {
		e.preventDefault()
		setLoad(true)
		const saveData = async (data) => {
			try {
				await setDoc(doc(db, 'Users',data.userId), {
					name: data.name,
					email: data.email,
					contact: data.contact,
					zip: data.zip,
					address: data.address,
					gender: data.gender,
					terms: data.terms,
					image: data.image,
					userType:2,
					userId:data.userId,
					taskcompletionStatus: data.taskcompletionStatus,
					status:true,
					created: Timestamp.now(),
				})
				toast.success('Registered successfully!!')
				sessionStorage.setItem("userId",data.userId)
				sessionStorage.setItem("userEmail",data.email)
				sessionStorage.setItem("userType",2)
				
				nav("/")
			} catch (err) {
				toast.error(err)
				setTimeout(()=>{
					setLoad(false)
				},700)
			}
		}
		await createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				// Signed in
				const user = userCredential.user
				sessionStorage.setItem("userId",user.uid)
				sessionStorage.setItem("userEmail",user.email)
				toast.success('Login Successful')
				console.log(user)
				let userdata = {
					userId: user.uid,
					name: name,
					email: email,
					contact: contact,
					zip: zip,
					address: address,
					gender: gender,
					terms: terms,
					fileName: fileName,
					image: image,
					taskcompletionStatus: taskcompletionStatus,
				}
				saveData(userdata)
			})
			.catch(error => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log(errorCode, errorMessage)
				alert('Error: ' + errorMessage)
				// ..
			})
	}
	const handlePasswordChange = data => {
		setPassword(data.target.value)
	}
	return (
		<>
		 <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<div class="container p-4  rounded">
				<div class="row pt-2">
					<div class="col-md-12 pt-2 col-lg-12 pb-2 text-center rounded logincolor">
						<div class="">
							<h1 class="title-single text-white rounded">Sign up</h1>
						</div>
					</div>

					<div className="container p-3 mx-auto  mt-4  ">
						<form onSubmit={handleSubmit}>
							<div class="form-group col-md-12 py-3">
								<label for="name" className="h5 ">
									Name
								</label>
								<input
									type="text"
									class="form-control my-3"
									id="name"
									aria-describedby="emailHelp"
									placeholder="Enter your name"
									required
									onChange={data => {
										setName(data.target.value)
									}}
								/>
							</div>
							<div class="form-group col-md-12">
								<label for="Email" className="h5 ">
									Email address
								</label>
								<input
									type="email"
									class="form-control mt-3"
									id="Email"
									aria-describedby="emailHelp"
									placeholder="Enter your email address"
									required
									onChange={data => {
										setEmail(data.target.value)
									}}
								/>
							</div>
							<div className="row">
								<div class="form-group col-md-3">
									<label for="contact" className="h5 my-3">
										Contact
									</label>
									<input
										type="number"
										class="form-control"
										id="contact"
										aria-describedby="emailHelp"
										placeholder="Enter your phone number"
										required
										onChange={data => {
											setContact(data.target.value)
										}}
									/>
								</div>
								<div class="form-group col-md-3">
									<label for="zip" className="h5 my-3 ">
										Pin Code{' '}
									</label>
									<input
										type="number"
										class="form-control"
										id="zip"
										aria-describedby="emailHelp"
										placeholder="Enter your Pin"
										required
										onChange={data => {
											setZip(data.target.value)
										}}
									/>
								</div>

								<div class="form-group col-md-6">
									<label for="address" className="h5 my-3 ">
										Address
									</label>
									<input
										type="text"
										class="form-control "
										id="address"
										aria-describedby="emailHelp"
										placeholder="Enter your home address"
										required
										onChange={data => {
											setAddress(data.target.value)
										}}
									/>
								</div>
							</div>

							<div class="col-md form-group mt-3">
								<label className="h5 me-3 ">Gender</label>

								<input
									type="radio"
									name="Gender"
									id="male"
									value={'Male'}
									onChange={data => {
										setGender(data.target.value)
									}}
								/>
								<label class="h6 me-3" for="male">
									Male
								</label>
								<input
									type="radio"
									value={'Female'}
									onChange={data => {
										setGender(data.target.value)
									}}
									name="Gender"
									id="female"
								/>
								<label class="h6 me-3" for="female">
									Female
								</label>
								<input
									type="radio"
									value={'Others'}
									onChange={data => {
										setGender(data.target.value)
									}}
									name="Gender"
									id="others"
								/>
								<label class="h6 " for="others">
									Others
								</label>
							</div>

							<div class="form-group">
								<label for="Password" className="h5 my-3 ">
									Password
								</label>
								<CustomInput className={'form-control'} value={password} onChange={handlePasswordChange} />
							</div>
							<div class="form-group form-check col-md-12 my-3 col-md-12">
								<input
									type="checkbox"
									class="form-check-input"
									id="terms"
									required
									onChange={data => {
										setTerms(data.target.value)
									}}
								/>
								<label class="form-check-label" className="h6 " for="terms">
									Agree to all terms and conditions
								</label>
							</div>
							<div className="">
								<button type="submit" class="btn btn-a rounded d-block mx-auto ">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div></>
	)
}
