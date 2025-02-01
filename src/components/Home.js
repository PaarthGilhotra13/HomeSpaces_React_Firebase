import * as React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
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
			<div class="intro intro-carousel swiper position-relative">
				<div class="">
					<div class="swiper-slide carousel-item-a intro-item bg-image image2">
						<div class="overlay overlay-a"></div>
						<div class="intro-content display-table">
							<div class="table-cell">
								<div class="container">
									<div class="row">
										<div class="col-lg-8">
											<div class="intro-body">
												<h1
													class="intro-title "
													style={{ fontFamily: 'sans-serif', marginBottom: '200px' }}
												>
													<span class="">Welcome</span>
													<br />
													<span class="color-b">to</span>
													<br />
													<span class="text-yellow">Home</span>
													<span class="color-b">Spaces</span>
												</h1>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>

			<main id="main">
				<section class="section-services section-t8">
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<div class="title-wrap d-flex justify-content-between">
									<div class="title-box">
										<h2 class="title-a">Our Services</h2>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="card-box-c foo">
									<div class="card-header-c d-flex">
										<div class="card-box-ico">
											<span class="bi bi-search"></span>
										</div>
										<div class="card-title-c align-self-center">
											<h2 class="title-c">PG Finding</h2>
										</div>
									</div>
									<div class="card-body-c">
										<p class="content-c">
										We provide a seamless platform to find and book rental properties, offering detailed property listings, advanced search filters, and hassle-free booking options for tenants.
										</p>
									</div>
									<div class="card-footer-c">
										<Link to="/" class="link-c link-icon">
											Read more
											<span class="bi bi-chevron-right"></span>
										</Link>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="card-box-c foo">
									<div class="card-header-c d-flex">
										<div class="card-box-ico">
											<span class="bi bi-house"></span>
										</div>
										<div class="card-title-c align-self-center">
											<h2 class="title-c">PG Booking</h2>
										</div>
									</div>
									<div class="card-body-c">
										<p class="content-c">
										Our platform simplifies PG booking by allowing users to explore properties, check availability, and secure their desired accommodations with just a few clicks.
										</p>
									</div>
									<div class="card-footer-c">
										<Link to="/bookingrequest" class="link-c link-icon">
											Read more
											<span class="bi bi-calendar4-week"></span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section class="section-agents section-t8">
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<div class="title-wrap d-flex justify-content-between">
									<div class="title-box">
										<h2 class="title-a">Best Agents</h2>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-4">
								<div class="card-box-d">
									<div class="card-img-d">
										<img src="/assets/assets/img/agent-6.jpg" alt="" class="img-d img-fluid" />
									</div>
									<div class="card-overlay card-overlay-hover">
										<div class="card-header-d">
											<div class="card-title-d align-self-center">
												<h3 class="title-d">
													<a href="agent-single.html" class="link-two">
														Margaret Sotillo
														<br /> Escala
													</a>
												</h3>
											</div>
										</div>
										<div class="card-body-d">
											<p class="content-d color-text-a">
												Sed porttitor lectus nibh, Cras ultricies ligula sed magna dictum porta two.
											</p>
											<div class="info-agents color-a">
												<p>
													<strong>Phone: </strong> +54 356 945234
												</p>
												<p>
													<strong>Email: </strong> agents@example.com
												</p>
											</div>
										</div>
										<div class="card-footer-d">
											<div class="socials-footer d-flex justify-content-center">
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
							<div class="col-md-4">
								<div class="card-box-d">
									<div class="card-img-d">
										<img src="/assets/assets/img/agent-1.jpg" alt="" class="img-d img-fluid" />
									</div>
									<div class="card-overlay card-overlay-hover">
										<div class="card-header-d">
											<div class="card-title-d align-self-center">
												<h3 class="title-d">
													<a href="agent-single.html" class="link-two">
														Stiven Spilver
														<br /> Darw
													</a>
												</h3>
											</div>
										</div>
										<div class="card-body-d">
											<p class="content-d color-text-a">
												Sed porttitor lectus nibh, Cras ultricies ligula sed magna dictum porta two.
											</p>
											<div class="info-agents color-a">
												<p>
													<strong>Phone: </strong> +54 356 945234
												</p>
												<p>
													<strong>Email: </strong> agents@example.com
												</p>
											</div>
										</div>
										<div class="card-footer-d">
											<div class="socials-footer d-flex justify-content-center">
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
							<div class="col-md-4">
								<div class="card-box-d">
									<div class="card-img-d">
										<img src="/assets/assets/img/agent-5.jpg" alt="" class="img-d img-fluid" />
									</div>
									<div class="card-overlay card-overlay-hover">
										<div class="card-header-d">
											<div class="card-title-d align-self-center">
												<h3 class="title-d">
													<a href="agent-single.html" class="link-two">
														Emma Toledo
														<br /> Cascada
													</a>
												</h3>
											</div>
										</div>
										<div class="card-body-d">
											<p class="content-d color-text-a">
												Sed porttitor lectus nibh, Cras ultricies ligula sed magna dictum porta two.
											</p>
											<div class="info-agents color-a">
												<p>
													<strong>Phone: </strong> +54 356 945234
												</p>
												<p>
													<strong>Email: </strong> agents@example.com
												</p>
											</div>
										</div>
										<div class="card-footer-d">
											<div class="socials-footer d-flex justify-content-center">
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
				</section>
			</main>
		</>
	)
}
