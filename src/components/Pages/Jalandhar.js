import { db } from '../Firebase'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

export default function Jalandhar() {
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

	const [allTask, SetTask] = useState([])

	useEffect(() => {
		const q = query(collection(db, 'AddRooms'), orderBy('created', 'asc'))
		onSnapshot(q, querySnapshot => {
			// console.log(querySnapshot.docs)
			SetTask(
				querySnapshot.docs.map(doc => ({
					id: doc.id,
					data: doc.data(),
				})),
			)
		})
	}, [])

	return (
		<>
			<section class="intro-single">
				<div class="container">
					<div class="row">
						<div class="title-single-box ">
							<h3 class="fontWeight">
								"Comfort and Convenience: Top Paying Guest Options in Jalandhar"
							</h3>
						</div>
					</div>
				</div>
			</section>
			<section class="property-grid grid">
				<div class="container">
					<div class="row">
						{allTask.map(AddRooms => (
							<div class="col-md-4">
								<div class="card-box-a card-shadow">
									<div class="img-box-a">
										<img
											src={AddRooms.data.image}
											alt=""
											class="img-a img-fluid"
											style={{height:'480px',width:'100px'}}
										/>
									</div>
									<div class="card-overlay">
										<div class="card-overlay-a-content">
											<div class="card-header-a">
												<h2 class="card-title-a">
													<a href="#">{AddRooms.data.addCategory}</a>
												</h2>
											</div>
											<div class="card-body-a">
												<div class="price-box d-flex">
													<span class="price-a">
														rent |₹ {AddRooms.data.addRent}{' '}
													</span>
												</div>
												<a href="property-single.html" class="link-a">
													Click here to view
													<span class="bi bi-chevron-right"></span>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	)
}
