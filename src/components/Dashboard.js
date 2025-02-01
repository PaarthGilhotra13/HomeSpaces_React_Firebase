import { collection, getCountFromServer } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { db } from "./Firebase"
import { FadeLoader } from "react-spinners";
export default function Dashboard() {
    const [load,setLoad]=useState(true)   
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
    const [cat,setCat]=useState(0)
    const [brand,setbrand]=useState(0)
    const [order,setorder]=useState(0)
    const [veh,setveh]=useState(0)
    useEffect(()=>{
        getCount1()
        getCount2()
        getCount3()
        getCount4()
    },[])
  const getCount1=async ()=>{
    const coll = collection(db, 'Users');
    const snapshot = await getCountFromServer(coll);
    setCat(snapshot.data().count);
    setTimeout(()=>{
        setLoad(false)
    },700)
  }
  const getCount2=async ()=>{
    const coll1 = collection(db, "AddRooms");
    const snapshot1 = await getCountFromServer(coll1);
    setbrand(snapshot1.data().count);
  }
    const getCount3=async ()=>{
    const col2 = collection(db, "addCity");
    const snapshot2 = await getCountFromServer(col2);
    setveh(snapshot2.data().count);
    }
    const getCount4=async ()=>{
      const coll3 = collection(db, "bookingRequests");
      const snapshot3 = await getCountFromServer(coll3);
      setorder(snapshot3.data().count);
  }
	return (
		<>
		 <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<div class="container-fluid " id="main">
				<div>
					<h1>Welcome Back ADMIN</h1>
				</div>
				<div class="row mt-5">
					<div class="col main pt-5 mt-5">
						<h1 class="display-4 d-none d-sm-block text-center">Dashboard</h1>

						<div class="alert alert-warning fade collapse" role="alert" id="myAlert">
							<button type="button" class="close" data-dismiss="alert" aria-label="Close">
								<span aria-hidden="true">×</span>
								<span class="sr-only">Close</span>
							</button>
						</div>
						<div class="row mb-3 text-center">
							<div class="col-xl-3 col-sm-6 py-2">
								<div class="card bg-success text-white h-100">
									<div class="card-body bg-success">
										<div class="rotate">
											<i class="fa fa-user fa-4x"></i>
										</div>
										<h6 class="text-uppercase">Users</h6>
										<h1 class="display-4">{cat}</h1>
									</div>
								</div>
							</div>
							<div class="col-xl-3 col-sm-6 py-2">
								<div class="card text-white bg-danger h-100">
									<div class="card-body bg-danger">
										<div class="rotate">
											<i class="fa fa-list fa-4x"></i>
										</div>
										<h6 class="text-uppercase">Bookings</h6>
										<h1 class="display-4">{order}</h1>
									</div>
								</div>
							</div>
							<div class="col-xl-3 col-sm-6 py-2">
								<div class="card text-white bg-info h-100">
									<div class="card-body bg-info">
										<div class="rotate">
											<i class="fa fa-globe fa-4x"></i>
										</div>
										<h6 class="text-uppercase">City</h6>
										<h1 class="display-4">{veh}</h1>
									</div>
								</div>
							</div>
							<div class="col-xl-3 col-sm-6 py-2">
								<div class="card text-white bg-warning h-100">
									<div class="card-body">
										<div class="rotate">
											<i class="fa fa-home fa-4x"></i>
										</div>
										<h6 class="text-uppercase">Rooms</h6>
										<h1 class="display-4">{brand}</h1>
									</div>
								</div>
							</div>
						</div>

						<hr />
					</div>
				</div>
			</div>
		</div></>
	)
}
