import { Link } from 'react-router-dom'
import { db } from './Firebase'
import { auth } from './Firebase'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { FadeLoader } from "react-spinners";
export default function UserProfile() {
  const [userData, setUserData] = useState([]);
  const [userType,setUserType]=useState("")
  const [userEmail,setUserEmail]=useState("")
  const [item,setItem]=useState(0)
  const userId=sessionStorage.getItem("userId")
  const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"10vh auto",
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
          setUserType(querySnapshot.docs[0]?.data()?.userType)
          setUserEmail(querySnapshot.docs[0]?.data()?.email)
          setUserData(querySnapshot.docs[0]?.data())
          console.log(userType,userEmail,userData)
      })
	  setTimeout(()=>{
		setLoad(false)
	},700)
    }
	return (
		<>
		 <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<section>
				<div className="container py-5">
					<div className="row mt-5">
						<div className="col mt-5">
					
						</div>
					</div>
						<div className="row ">
							<div className="col-lg-3">
								<div className="card mb-4">
									<div className="card-body text-center">
										<img
											src={userData?.image=="" || !userData?.image?"/assets/assets/img/R.png":userData?.image}
											alt=""
											className="rounded-circle "
											style={{ width: '200px', height: '200px' }}
										/>

										<p className="text-muted mb-1">Full Stack Developer</p>
										<p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
									</div>
								</div>
							</div>
							<div className="col-lg-8">
								<div className="card mb-4">
									<div className="card-body">
										<div className="row">
											<div className="col-sm-3">
												<p className="mb-0">Full Name</p>
											</div>
											<div className="col-sm-9">
												<p className="text-muted mb-0">{userData?.name}</p>
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<p className="mb-0">Email</p>
											</div>
											<div className="col-sm-9">
												<p className="text-muted mb-0">{userData?.email}</p>
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<p className="mb-0">Phone</p>
											</div>
											<div className="col-sm-9">
												<p className="text-muted mb-0">{userData?.contact}</p>
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<p className="mb-0">Address</p>
											</div>
											<div className="col-sm-9">
												<p className="text-muted mb-0">{userData?.address}</p>
											</div>
										</div>
                    <hr/>
										<div className="row">
											<div className="col-sm-3">
												<p className="mb-0">Zip Code</p>
											</div>
											<div className="col-sm-9">
												<p className="text-muted mb-0">{userData?.zip}</p>
											</div>
										</div>
                    <hr/>
										<div className="row">
											<div className="col-md-4 offset-md-5">
												<Link className='btn btn-success' to="/admin/updateprofile">Update Profile</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
				</div>
			</section>
		</div></>
	)
}
