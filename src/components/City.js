import * as React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { FadeLoader } from "react-spinners";
export default function City() {
	const [load,setLoad]=useState(true)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	return (
		<>
			{/* 
  <main id="main">

    <section class="intro-single">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-8">
            <div class="title-single-box">
              <h1 class="title-single"> View Contact</h1>
            </div>
          </div>
                </div>
      </div>
    </section>
    <div className="row ms-5 ps-5">
        <table className="table table-bordered table-responsive">
            <tr>
                <th>Id</th>
                <th> City Name</th>
                <th>Status</th>
                <th>Created_at</th>
            </tr>
        </table>
    </div>

  </main>

 */}
  <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<div class="container mt-5">
				<div class="row mt-5 ">
					<div class="col-md-12 col-lg-12 mt-5 mx-auto logincolor">
						<div class="mt-5 pb-4 ">
							<h1 class="text-white text-center">City</h1>
						</div>
					</div>
				</div>
			</div>
			<div className="container mt-4">
				<div className="row">
					<table className="table table-striped">
						<thead className="table-dark">
							<tr>
								<th>Id</th>
								<th>City Name</th>
								<th>Status</th>
								<th>Created At</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Id</td>
								<td>Name</td>
								<td>Email</td>
								<td>Subject</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div></>
	)
}
