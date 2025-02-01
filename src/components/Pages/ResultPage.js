// src/components/ResultPage.js
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { db } from '../Firebase'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { FadeLoader } from "react-spinners";
const ResultPage = () => {
	const param = useParams()
	const nav = useNavigate()
	const [allTask,setTask]=useState()
	const [id, setId] = useState(param.id)
	const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
		useEffect(() => {
			setId(param?.id)
			console.log(id)
			if(!!id){
			
			console.log("inside if ", id)
			const q = query(collection(db, 'AddRooms'), where('addCity',"==",id), orderBy('created', 'asc'))
			
			onSnapshot(q, querySnapshot => {
				// console.log(querySnapshot.docs)
				setTask(
					querySnapshot.docs.map(doc => ({
						id: doc.id,
						data: doc.data(),
					})),
				)
			})
			setTimeout(()=>{
				setLoad(false)
			},700)
		}else{
			const q = query(collection(db, 'AddRooms'), orderBy('created', 'asc'))
			onSnapshot(q, querySnapshot => {
				// console.log(querySnapshot.docs)
				setTask(
					querySnapshot.docs.map(doc => ({
						id: doc.id,
						data: doc.data(),
					})),
				)
			})
			setTimeout(()=>{
				setLoad(false)
			},700)
		}
	}, [param?.id])
	return (
		<>
		 <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<section class="intro-single">
				<div class="container">
					<div class="row">
						<div class="title-single-box ">
							<h3 class="fontWeight">
								"Comfort and Convenience: Top Paying Guest Options in {id}"
							</h3>
						</div>
					</div>
				</div>
			</section>
			<section class="property-grid grid">
				<div class="container">
					<div class="row">
						{allTask?.map((
							el,index
						)=>(
							<div class="col-md-4" key={index}>
							<div class="card-box-a card-shadow">
								<div class="img-box-a">
									<img
										src={el?.data?.image}
										alt=""
										class="img-a img-fluid"
										style={{ height: '480px'}}
									/>
								</div>
								<div class="card-overlay">
									<div class="card-overlay-a-content">
										<div class="card-header-a">
											<h2 class="card-title-a">
												<a href="#">{el?.data.addCategory}</a>
											</h2>
										</div>
										<div class="card-body-a">
											<div class="price-box d-flex">
												<span class="price-a">rent/cost |₹ {el?.data?.addRent} </span>
											</div>
											<Link to={"/PropertySingle/"+el?.id}>
											<a href="#" class="link-a">
												Click here to view
												<span class="bi bi-chevron-right"></span>
											</a>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
						))}
						
					</div>
				</div>
			</section>
		</div></>
	)
}

export default ResultPage
