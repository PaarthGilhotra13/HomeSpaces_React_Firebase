import { useNavigate } from 'react-router-dom'
import { db, storage } from './Firebase'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import CustomInput from './layout/CustomInput'
import {toast} from "react-toastify"
import { useState, useEffect } from 'react'
import { FadeLoader } from "react-spinners";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc, where } from 'firebase/firestore'
export default function UpdateProfile() {
    const userId=sessionStorage.getItem("userId")
    const nav = useNavigate()
	const [name, setName] = useState('')
    const [id,setId]=useState("")
	const [email, setEmail] = useState('')
	const [contact, setContact] = useState('')
	const [zip, setZip] = useState('')
    const [file, setFile] = useState(null)
    const [percent, setPercent] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [prevFileName, setPrevFileName] = useState()
    const [image,setImage]=useState()
	const [address, setAddress] = useState('')
	const [gender, setGender] = useState('')
	const [password, setPassword] = useState('')
	const [terms, setTerms] = useState('')
	const [taskcompletionStatus, settaskcompletionStatus] = useState('Pending')
    const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"relative",
        "top":"50%",
        "bottom":"50%",
        "zIndex":"1",
    }
    useEffect(()=>{
        if(userId !="" && userId!="null" && userId!=null && userId!="undefined" && userId!=undefined){
            getSingleTaskData()
        }
    },[userId])
      const getSingleTaskData = async () => {
        const que = query(collection (db, 'Users'),where("userId","==",userId))
        onSnapshot(que,(querySnapshot) => {
            setContact(querySnapshot.docs[0]?.data()?.contact)
            setName(querySnapshot.docs[0]?.data().name)
            setZip(querySnapshot.docs[0]?.data().zip)
            setGender(querySnapshot.docs[0]?.data().gender)
            setAddress(querySnapshot.docs[0]?.data().address)
            setImage(querySnapshot.docs[0]?.data().image)
            setPrevFileName(querySnapshot.docs[0]?.data().fileName)
            setFile(querySnapshot.docs[0]?.data().file)
            setId(querySnapshot.docs[0]?.id)
        })
		setTimeout(()=>{
			setLoad(false)
		},700)
      }
      const handleForm = async (e) => {
        e.preventDefault();                        
        setLoad(true)
        if (!!file)
            uploadFile()
        else updateData()
    }
    async function updateData() {
        console.log(id)
        const taskDocRef = doc(db, 'Users', id)
    
        try {
            let data = {
                name: name,
                contact: contact,
                zip: zip,
                address: address,
                gender: gender,
                terms: terms,
                image: image,
                taskcompletionStatus: taskcompletionStatus,
            }
            if (!!imageUrl) {
                data.image = imageUrl
                data.fileName = fileName
            }
            console.log(data)
            await updateDoc(taskDocRef, data)
            toast.success("Updated Successfully!!")
            setTimeout(()=>{
                nav("/admin/profile")
            },700)
        } catch (err) {
            setTimeout(()=>{
                setLoad(false)
            },700)
            toast.error("Something went wrong!")
        }
    }
    useEffect(() => {
        if (!!imageUrl) {
            deletePreviousImage()
            updateData()
        }
    }, [imageUrl])
    function deletePreviousImage() {
        const fileRef = ref(storage, "files/" + prevFileName);
        deleteObject(fileRef).then(function () {
            console.log("Prev File Deleted")
        }).catch(function (error) {
            console.log("Error deleting previous image")
        });
    }
    const uploadFile = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
        const fileName = `${Date.now()}-${file.name}`
        const storageRef = ref(storage, `/files/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    // console.log(url);
                    setImageUrl(url)
                    setFileName(fileName)
                    setImage(url)
                });
            }
        );
    };
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
							<h1 class="title-single text-white rounded">Update Profile</h1>
						</div>
					</div>

					<div className="container p-3 mx-auto  mt-4  ">
						<form onSubmit={handleForm}>
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
                                    value={name}
									onChange={data => {
										setName(data.target.value)
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
                                        value={contact}
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
                                        value={zip}
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
                                        value={address}
										onChange={data => {
											setAddress(data.target.value)
										}}
									/>
								</div>
                             
							</div>
                            <div className='row'>
                            <div class="form-group col-md-3">
									<label for="image" className="h5 my-3 ">
										Image{' '}
									</label>
									<input
										type="file"
										class="form-control"
										id="image"
										aria-describedby="emailHelp"
										placeholder="Enter your Image"
										
										onChange={data => {
											setFile(data.target.files[0])
										}}
									/>
								</div>
                                <div class="col-md form-group mt-3">
								<label className="h5 me-3 ">Gender{' '}</label>
                                <br/>
								<input
                                    className='form-check-input mt-4 '
									type="radio"
									name="Gender"
									id="male"
									value={'Male'}
									onChange={data => {
										setGender(data.target.value)
									}}
                                    checked={"male"==gender}
								/>
								<label class="h6 me-3" for="male">
									Male
								</label>
								<input
                                 className='form-check-input mt-4'
									type="radio"
									value={'Female'}
									onChange={data => {
										setGender(data.target.value)
									}} checked={"Female"==gender}
									name="Gender"
									id="female"
								/>
								<label class="h6 me-3 mt-4" for="female">
									Female
								</label>
								<input
                                 className='form-check-input mt-4'
									type="radio"
									value={'Others'}
									onChange={data => {
										setGender(data.target.value)
									}}
									name="Gender"
									id="others"
                                    checked={"Others"==gender}
								/>
								<label class="h6 " for="others">
									Others
								</label>
							</div>
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
