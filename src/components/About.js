import * as React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
export default function About() {
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
			<div class="click-closed"></div>
			<div class="box-collapse">
				<div class="title-box-d">
					<h3 class="title-d">Search Property</h3>
				</div>
				<span class="close-box-collapse right-boxed bi bi-x"></span>
				<div class="box-collapse-wrap form">
					<form class="form-a">
						<div class="row">
							<div class="col-md-12 mb-2">
								<div class="form-group">
									<label class="pb-2" for="Type">
										Keyword
									</label>
									<input
										type="text"
										class="form-control form-control-lg form-control-a"
										placeholder="Keyword"
									/>
								</div>
							</div>
							<div class="col-md-6 mb-2">
								<div class="form-group mt-3">
									<label class="pb-2" for="Type">
										Type
									</label>
									<select class="form-control form-select form-control-a" id="Type">
										<option>All Type</option>
										<option>For Rent</option>
										<option>For Sale</option>
										<option>Open House</option>
									</select>
								</div>
							</div>
							<div class="col-md-6 mb-2">
								<div class="form-group mt-3">
									<label class="pb-2" for="city">
										City
									</label>
									<select class="form-control form-select form-control-a" id="city">
										<option>All City</option>
										<option>Alabama</option>
										<option>Arizona</option>
										<option>California</option>
										<option>Colorado</option>
									</select>
								</div>
							</div>
							<div class="col-md-6 mb-2">
								<div class="form-group mt-3">
									<label class="pb-2" for="bedrooms">
										Bedrooms
									</label>
									<select class="form-control form-select form-control-a" id="bedrooms">
										<option>Any</option>
										<option>01</option>
										<option>02</option>
										<option>03</option>
									</select>
								</div>
							</div>
							<div class="col-md-6 mb-2">
								<div class="form-group mt-3">
									<label class="pb-2" for="garages">
										Garages
									</label>
									<select class="form-control form-select form-control-a" id="garages">
										<option>Any</option>
										<option>01</option>
										<option>02</option>
										<option>03</option>
										<option>04</option>
									</select>
								</div>
							</div>
							<div class="col-md-6 mb-2">
								<div class="form-group mt-3">
									<label class="pb-2" for="bathrooms">
										Bathrooms
									</label>
									<select class="form-control form-select form-control-a" id="bathrooms">
										<option>Any</option>
										<option>01</option>
										<option>02</option>
										<option>03</option>
									</select>
								</div>
							</div>
							<div class="col-md-6 mb-2">
								<div class="form-group mt-3">
									<label class="pb-2" for="price">
										Min Price
									</label>
									<select class="form-control form-select form-control-a" id="price">
										<option>Unlimite</option>
										<option>50,000</option>
										<option>100,000</option>
										<option>150,000</option>
										<option>200,000</option>
									</select>
								</div>
							</div>
							<div class="col-md-12">
								<button type="submit" class="btn btn-b">
									Search Property
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>

			<main id="main">
				<section class="intro-single">
					<div class="container">
						<div class="row">
							<div class="col-md-12 col-lg-8">
								<div class="title-single-box">
									<h1 class="title-single">About Us</h1>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section class="section-about">
					<div class="container">
						<div class="row">
							<div class="col-sm-12 position-relative">
								<div class="about-img-box">
									<img src="/assets/assets/img/slide-about-1.jpg" alt="" class="img-fluid" />
								</div>
								<div class="sinse-box">
									<h3 class="sinse-title">
										HomeSpaces
										<span></span>
										<br /> Since 2024
									</h3>
									<p>faith</p>
								</div>
							</div>
							<div class="col-md-12 section-t8 position-relative">
								<div class="row">
									<div class="col-md-6 col-lg-5">
										<img src="/assets/assets/img/about-2.jpg" alt="" class="img-fluid" />
									</div>
									<div class="col-lg-2  d-none d-lg-block position-relative">
										<div class="title-vertical d-flex justify-content-start">
											{/* <span>HomeSpaces </span> */}
										</div>
									</div>
									<div class="col-md-6 col-lg-5 section-md-t3">
										<div class="title-box-d">
											<h3 class="title-d">
												<span class="color-d">About</span>
											</h3>
										</div>
										<p class="color-text-a fs-5">
											HomeSpaces is a PG searching platform, specifically designed to help users search and
											find Paying Guest accommodations or shared living spaces. It offers a user-friendly
											interface accessible through a web browser, allowing individuals to conveniently search
											and explore available PG options.
										</p>
										<p class="color-text-a fs-5">
											The web app typically provides various features and functionalities to enhance the user
											experience. These may include advanced search filters to narrow down preferences such
											as location, budget, amenities, and room types. The app may also display detailed
											property listings, including information about facilities, nearby amenities, and photos
											of the accommodations.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}
