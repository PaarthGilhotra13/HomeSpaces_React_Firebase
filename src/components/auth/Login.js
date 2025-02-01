import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import CustomInput from '../layout/CustomInput'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db, googleProvider } from '../Firebase'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { Timestamp, addDoc, collection, doc, getDoc, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { FadeLoader } from "react-spinners";
export default function Login({ onNavigate }) {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLogin, setIsLogin] = useState(false)
	const [load,setLoad]=useState(false)
    const override={
        "display":"block",
        "margin":"10vh auto",
        "zIndex":"1",
    }
	const [showPassword, setShowPassword] = useState(false)
	
    const handleForm = async (e) => {
		e.preventDefault();
		setLoad(true)
		try {
		  const userCredentials = await signInWithEmailAndPassword(auth, email, password);
		  const userId = userCredentials.user.uid;
		  const docRef = doc(db, "Users", userId);
		  const docData = await getDoc(docRef);
	
		  if (docData.exists()) {
			const userData = docData.data();
			if(userData.status==true){
			  toast.success("Login successfully!!")
			sessionStorage.setItem("userId", userId)
			sessionStorage.setItem("email",userData.email)
			sessionStorage.setItem("userType",userData.userType)
			sessionStorage.setItem("name", userData.name)
			if (userData.userType == 1) {
			  navigate("/admin/dashboard");
			} 
			else {
			  navigate("/");
			}
		  }else{
			toast.error("Account Blocked. Contact admin!!")
		  }
		  } else {
			toast.error("No data found");
		  }
		} catch (err) {
		  console.error(err);
		  toast.error(err.message);
		}
		setTimeout(()=>{setLoad(false)},500)
	  };
	const handlePasswordChange = data => {
		setPassword(data.target.value)
	}
	const signInWithGoogle = async () => {
		setLoad(true)
		try {
		  await signInWithPopup(auth,googleProvider).then((res)=>{
			  const users=res.user
			  sessionStorage.setItem("userId",users.uid)
			  sessionStorage.setItem("userEmail",users.email)
			  sessionStorage.setItem("cart",JSON.stringify([]))
			  addUser(users.uid, users.email)
			  navigate("/")
		  }).catch((err)=>{
			setTimeout(()=>{
				setLoad(false)
			},700)
			console.log(err)
		toast.error("Something went wrong")
		});
		  } catch (err){
			console.error(err);
			toast.error("Something went wrong")
			setTimeout(()=>{
			  setLoad(false)
		  },700)
		  }
	  };
	  const addUser=async (uid, email1)=>{
		console.log(uid)
		try {
			await setDoc(doc(db, 'Users',uid), {
				userId:uid,
				status:"Active",
				email:email1,
				userType:"User",
				created: Timestamp.now()
			})
			toast.success("User Created")
			} catch (err) {
			  setTimeout(()=>{
				  setLoad(false)
			  },700)
			toast.error("Something went wrong, Try again later!!")
			}
		}

	return (
		<>
		 <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<div class="container p-3  " style={{ width: '400px' }}>
				<div class="row mt-1 logincolor rounded ">
					{/* <div class="row mt-5 bg-success"> */}
					<div class="col-md col-lg mt-2">
						<div class="title-single-box mt-1">
							<h1 class="title-single pb-3 text-center text-white">Sign in</h1>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 py-3 mt-2 rounded">
						<form onSubmit={handleForm}>
							<div class="form-group">
								<label className="py-3">Email Address</label>
								<input
									type="email"
									class="form-control mb-1 rounded-pill"
									id="addcategory"
									placeholder="enter your email here"
									required
									onChange={data => {
										setEmail(data.target.value)
									}}
								/>
							</div>
							<div class="form-group">
								<label className="py-3">Password</label>
								{/* <input type="password" class="form-control mb-4 rounded-pill" id="addcategory"  placeholder="enter your password here" required
                          onChange={(data)=>{setPass(data.target.value)}}/> */}
								<CustomInput
									className={'form-control rounded-pill'}
									value={password}
									onChange={handlePasswordChange}
								/>
							</div>

							<button type="submit" class="btn btn-success rounded mx-auto d-block mt-4">
								Submit
							</button>
						</form>

						<div class="form-group row mt-3">
							<Link className=" text " to="/forgot" onClick={() => onNavigate('/forgot')}>
								Forgot Password
							</Link>

							<span>
								Don't have an account?
								<Link to="/register" onClick={() => navigate('/register')}>
									{' '}
									Register
								</Link>
							</span>
						</div>
						<button onClick={signInWithGoogle} className="btn  btn-a rounded mt-3 text-white">
							Sign in with &nbsp;<i className="fa fa-google"></i>
						</button>
					</div>
				</div>
			</div>

			<ToastContainer />
		</div></>
	)
}
