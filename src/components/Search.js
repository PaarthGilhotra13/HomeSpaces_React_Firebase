import React, { useState } from 'react'
import { useEffect } from 'react'
import { db } from './Firebase'
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import Select from "react-select";
import { Link, useNavigate } from 'react-router-dom'
import { FadeLoader } from "react-spinners";
export default function Search() {
	const [allTask, SetTask] = useState([])
	const [load,setLoad]=useState(false)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	useEffect(() => {
		const q = query(collection(db, 'addCity'), orderBy('created', 'asc'))
		onSnapshot(q, querySnapshot => {
			// console.log(querySnapshot.docs)
			SetTask(
				querySnapshot.docs.map(doc => ({
					id: doc.id,
					data: doc.data(),
				})),
			)
		})
		// setTimeout(()=>{
		// 	setLoad(false)
		// },700)
	}, [])
	const [cityId,setCityId]=useState()
	const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false)
    const city_data=[]
	for(let x in allTask){
        city_data.push({value:allTask[x]['addCity'],label:allTask[x]['data']['addCity']})
    }
	const nav=useNavigate()
	useEffect(()=>{
		if(!!cityId){
		nav("/viewProperty/"+cityId)
		}
	},[cityId])
	return (
		<>
		  
			<div class="container ">
				<div class="row logincolor">
					{/* <div class="row mt-5 bg-success"> */}
					<div class="col-md-12 col-lg-12 ">
						<div class="title-single-box mt-3">
							<h1 class="title-single pb-3 text-center text-white">Search</h1>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 row my-4 shadow py-5 rounded ">
						<div className="row">
							<div className="row ">
								<form className="d-flex">
								<Select
								className="form-control "
								defaultValue={'Enter City'}
								isDisabled={isDisabled}
								isLoading={isLoading}
								isClearable={isClearable}
								isRtl={isRtl}
								isSearchable={isSearchable}
								name="color"
								options={city_data}
								onChange={(e)=>{setCityId(e?.value)}}
							/>
									<div className="d-flex border align-items-center">
										<button className=" btn btn-xl" >
											<i className="fa fa-search fa-2x"></i>
										</button>
									</div>
								</form>
							</div>
						</div>
						<div className="d-flex  flex-wrap">
							{allTask.map((AddRooms) => (
							<Link to={'/viewProperty/'+ AddRooms.data.addCity}>
							<div className="row mt-3 ms-1">
								<div class="p-2" >
									<i className="fa fa-globe fa-3x"></i>
								</div>
								<div class="p-2">{AddRooms.data.addCity}</div>
							</div>
							</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
