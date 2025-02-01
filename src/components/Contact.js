import * as React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { db } from './Firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { FadeLoader } from "react-spinners";
export default function Contact() {
	const [addName, setAddName] = useState('')
	const [addEmail, setAddEmail] = useState('')
	const [addSubject, setAddSubject] = useState('')
	const [addMessage, setAddMessage] = useState('')
	const [taskcompletionStatus, settaskcompletionStatus] = useState('Pending')
	const [load,setLoad]=useState(false)
    const override={
        "display":"block",
        "margin":"10vh auto",
     "zIndex":"1",
    }
  
  
	const handleform = async data => {
		data.preventDefault()
		setLoad(true)
		try {
			await addDoc(collection(db, 'Contacts'), {
				addName: addName,
				addEmail: addEmail,
				addSubject: addSubject,
				addMessage: addMessage,
				taskcompletionStatus: taskcompletionStatus,

				created: Timestamp.now(),
			})
			toast.success('Request sent')
			setTimeout(()=>{
				setLoad(false)
			},700)
		} catch (err) {
			toast.error("Something went Wrong")
			setTimeout(()=>{
				setLoad(false)
			},700)
		}
	}
	useEffect(() => {
		const jsFiles = ['/assets/assets/js/extra.js']

		jsFiles.forEach(filePath => {
			const script = document.createElement('script')
			script.src = filePath
			script.async = true
			document.body.appendChild(script)
		})

		return () => {
			jsFiles.forEach(filePath => {
				const script = document.querySelector(`[src="${filePath}"]`)
				if (script) {
					document.body.removeChild(script)
				}
			})
		}
	}, [])
	return (
		<>
		 <div className="d-flex justify-content-center my-5 py-5">
                <FadeLoader loading={load} cssOverride={override} size={50} color={"green"}/>
            </div>
            <div className={load?"disabled-screen-full":""}> 
			<main id="main">
				<section class="intro-single">
					<div class="container">
						<div class="row">
							<div class="col-md-12 col-lg-8">
								<div class="title-single-box">
									<h1 class="title-single">Contact US</h1>
									<span class="color-text-a">
										Aut voluptas consequatur unde sed omnis ex placeat quis eos. Aut natus officia corrupti
										qui autem fugit consectetur quo. Et ipsum eveniet laboriosam voluptas beatae possimus qui
										ducimus. Et voluptatem deleniti. Voluptatum voluptatibus amet. Et esse sed omnis inventore
										hic culpa.
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section class="contact">
					<div class="container">
						<div class="row">
							<div class="col-sm-12">
								<div class="contact-map box">
									<div id="map" class="contact-map">
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes+Square!5e0!3m2!1ses-419!2sve!4v1510329142834"
											width="100%"
											height="450"
											frameborder="0"
											allowfullscreen
										></iframe>
									</div>
								</div>
							</div>
							<div class="col-sm-12 section-t8">
								<div class="row">
									<div class="col-md-7">
										<form method="post" role="form" onSubmit={handleform}>
											<div class="row">
												<div class="col-md-6 mb-3">
													<div class="form-group">
														<input
															type="text"
															name="name"
															id="name"
															class="form-control form-control-lg form-control-a"
															placeholder="Your Name"
															required
															onChange={data => {
																setAddName(data.target.value)
															}}
														/>
													</div>
												</div>
												<div class="col-md-6 mb-3">
													<div class="form-group">
														<input
															name="email"
															type="email"
															class="form-control form-control-lg form-control-a"
															placeholder="Your Email"
															required
															onChange={data => {
																setAddEmail(data.target.value)
															}}
														/>
													</div>
												</div>
												<div class="col-md-12 mb-3">
													<div class="form-group">
														<input
															type="text"
															name="subject"
															class="form-control form-control-lg form-control-a"
															placeholder="Subject"
															required
															onChange={data => {
																setAddSubject(data.target.value)
															}}
														/>
													</div>
												</div>
												<div class="col-md-12">
													<div class="form-group">
														<textarea
															name="message"
															class="form-control"
															cols="45"
															rows="8"
															placeholder="Message"
															required
															onChange={data => {
																setAddMessage(data.target.value)
															}}
														></textarea>
													</div>
												</div>

												<div class="col-md-12 text-center mt-3">
													<button type="submit" class="btn btn-a">
														Send Message
													</button>
												</div>
											</div>
										</form>
									</div>
									<div class="col-md-5 section-md-t3">
										<div class="icon-box section-b2">
											<div class="icon-box-icon">
												<span class="bi bi-envelope"></span>
											</div>
											<div class="icon-box-content table-cell">
												<div class="icon-box-title">
													<h4 class="icon-title">Say Hello</h4>
												</div>
												<div class="icon-box-content">
													<p class="mb-1">
														Email:&nbsp;
														<span class="color-a">govindmaurya8699@gmail.com</span>
													</p>
													<p class="mb-1">
														Phone;&nbsp;
														<span class="color-a">+91 8360675618</span>
													</p>
												</div>
											</div>
										</div>
										<div class="icon-box section-b2">
											<div class="icon-box-icon">
												<span class="bi bi-geo-alt"></span>
											</div>
											<div class="icon-box-content table-cell">
												<div class="icon-box-title">
													<h4 class="icon-title">Find us in</h4>
												</div>
												<div class="icon-box-content">
													<p class="mb-1">
														Model House,
														<br /> Jalandhar. Punjab.
													</p>
												</div>
											</div>
										</div>
										<div class="icon-box">
											<div class="icon-box-icon">
												<span class="bi bi-share"></span>
											</div>
											<div class="icon-box-content table-cell">
												<div class="icon-box-title">
													<h4 class="icon-title">Social networks</h4>
												</div>
												<div class="icon-box-content">
													<div class="socials-footer">
														<ul class="list-inline">
															<li class="list-inline-item">
																<a href="#" class="link-one">
																	<i class="bi bi-facebook" aria-hidden="true"></i>
																</a>
															</li>
															<li class="list-inline-item">
																<a href="#" class="link-one">
																	<i class="bi bi-twitter" aria-hidden="true"></i>
																</a>
															</li>
															<li class="list-inline-item">
																<a href="#" class="link-one">
																	<i class="bi bi-instagram" aria-hidden="true"></i>
																</a>
															</li>
															<li class="list-inline-item">
																<a href="#" class="link-one">
																	<i class="bi bi-linkedin" aria-hidden="true"></i>
																</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div></>
	)
}
