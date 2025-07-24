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
            <main id="main">
                {/* ======= Intro Single ======= */}
                <section className="intro-single">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-8">
                                <div className="title-single-box">
                                    <h1 className="title-single">
                                        Your Journey to Finding Home Begins Here.
                                    </h1>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                                <nav
                                    aria-label="breadcrumb"
                                    className="breadcrumb-box d-flex justify-content-lg-end"
                                >
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            About
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Intro Single*/}
                {/* ======= About Section ======= */}
                <section className="section-about">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 position-relative">
                                <div className="about-img-box">
                                    <img
                                        src="/assets/assets/img/about1.jpg"
                                        alt=""
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="sinse-box">
                                    <h3 className="sinse-title">
                                        HomeSpaces
                                        <span />
                                        {/* <br /> Since 2017/ */}
                                    </h3>
                                    <p>Art &amp; Creative</p>
                                </div>
                            </div>
                            <div className="col-md-12 section-t8 position-relative">
                                <div className="row">
                                    <div className="col-md-6 col-lg-5">
                                        <img
                                            src="assets/assets/img/about3.jpg"
                                            alt=""
                                            className=" img-fluid"
                                        />
                                    </div>
                                    <div className="col-lg-1 mt-5 d-none d-lg-block position-relative">
                                        {/* <div className="title-vertical d-flex justify-content-start">
                                            <span>HomeQuest Exclusive Property</span>
                                        </div> */}
                                    </div>
                                    <div className="col-md-6 col-lg-5 section-md-t3">
                                        <div className="title-box-d">
                                            <h3 className="title-d">
                                                Who We Are
                                                {/* <span className="color-d">porttitor</span> lectus */}
                                                {/* <br /> nibh. */}
                                            </h3>
                                        </div>
                                        <p className="color-text-a">
                                            Welcome to Home Spaces, your trusted partner in finding the perfect home. Whether you're looking for a cozy apartment in the heart of the city or a spacious house in a peaceful neighborhood, we are here to help. At Home Quest, we believe that finding a home should be an exciting and joyful journey, not a stressful one. That's why we provide a seamless, user-friendly platform that connects you with the best rental and purchase options in your desired location."
                                        </p>
                                        <p className="color-text-a">
                                            At Home Spaces, we understand that finding the right home is more than just a transaction—it's a personal journey. We are a team of dedicated professionals with a deep passion for real estate, committed to transforming the way people find homes. Our platform is designed to offer a comprehensive and user-friendly experience, ensuring that whether you're searching for a rental apartment or looking to buy your dream home, you have access to the best listings and support at every step. With a focus on transparency, security, and customer satisfaction, we strive to make the home-finding process as seamless and enjoyable as possible.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* =======Team Section ======= */}
                <section className="section-agents section-t8">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="title-wrap d-flex justify-content-between">
                                    <div className="title-box">
                                        <h2 className="title-a">Meet Our Team</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card-box-d">
                                    <div className="card-img-d">
                                        <img
                                            src="assets/assets/img/agent-7.jpg"
                                            alt=""
                                            className="img-d img-fluid"
                                        />
                                    </div>
                                    <div className="card-overlay card-overlay-hover">
                                        <div className="card-header-d">
                                            <div className="card-title-d align-self-center">
                                                <h3 className="title-d">
                                                    <a href="agent-single.html" className="link-two">
                                                        Margaret Sotillo
                                                        <br /> Escala
                                                    </a>
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="card-body-d">
                                            <p className="content-d color-text-a">
                                                Sed porttitor lectus nibh, Cras ultricies ligula sed magna
                                                dictum porta two.
                                            </p>
                                            <div className="info-agents color-a">
                                                <p>
                                                    <strong>Phone: </strong> +54 356 945234
                                                </p>
                                                <p>
                                                    <strong>Email: </strong> agents@example.com
                                                </p>
                                            </div>
                                        </div>
                                        <div className="card-footer-d">
                                            <div className="socials-footer d-flex justify-content-center">
                                                <ul className="list-inline">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-facebook" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-twitter" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-instagram" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-linkedin" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-box-d">
                                    <div className="card-img-d">
                                        <img
                                            src="assets/assets/img/agent-6.jpg"
                                            alt=""
                                            className="img-d img-fluid"
                                        />
                                    </div>
                                    <div className="card-overlay card-overlay-hover">
                                        <div className="card-header-d">
                                            <div className="card-title-d align-self-center">
                                                <h3 className="title-d">
                                                    <a href="agent-single.html" className="link-two">
                                                        Stiven Spilver
                                                        <br /> Darw
                                                    </a>
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="card-body-d">
                                            <p className="content-d color-text-a">
                                                Sed porttitor lectus nibh, Cras ultricies ligula sed magna
                                                dictum porta two.
                                            </p>
                                            <div className="info-agents color-a">
                                                <p>
                                                    <strong>Phone: </strong> +54 356 945234
                                                </p>
                                                <p>
                                                    <strong>Email: </strong> agents@example.com
                                                </p>
                                            </div>
                                        </div>
                                        <div className="card-footer-d">
                                            <div className="socials-footer d-flex justify-content-center">
                                                <ul className="list-inline">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-facebook" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-twitter" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-instagram" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-linkedin" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-dribbble" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-box-d">
                                    <div className="card-img-d">
                                        <img
                                            src="assets/assets/img/agent-5.jpg"
                                            alt=""
                                            className="img-d img-fluid"
                                        />
                                    </div>
                                    <div className="card-overlay card-overlay-hover">
                                        <div className="card-header-d">
                                            <div className="card-title-d align-self-center">
                                                <h3 className="title-d">
                                                    <a href="agent-single.html" className="link-two">
                                                        Emma Toledo
                                                        <br /> Cascada
                                                    </a>
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="card-body-d">
                                            <p className="content-d color-text-a">
                                                Sed porttitor lectus nibh, Cras ultricies ligula sed magna
                                                dictum porta two.
                                            </p>
                                            <div className="info-agents color-a">
                                                <p>
                                                    <strong>Phone: </strong> +54 356 945234
                                                </p>
                                                <p>
                                                    <strong>Email: </strong> agents@example.com
                                                </p>
                                            </div>
                                        </div>
                                        <div className="card-footer-d">
                                            <div className="socials-footer d-flex justify-content-center">
                                                <ul className="list-inline">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-facebook" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-twitter" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-instagram" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-linkedin" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="link-one">
                                                            <i className="bi bi-dribbble" aria-hidden="true" />
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

                {/* ======= Our Mission ======= */}
                <section className="section-about">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 section-t8 position-relative">
                                <div className="row">
                                    <div className="col-md-6 col-lg-5">
                                        <img
                                            src="/assets/assets/img/about4.jpg"
                                            alt=""
                                            className=" img-fluid"
                                        />
                                    </div>
                                    <div className="col-lg-1 mt-5 d-none d-lg-block position-relative">
                                        {/* <div className="title-vertical d-flex justify-content-start">
                                            <span>HomeQuest Exclusive Property</span>
                                        </div> */}
                                    </div>
                                    <div className="col-md-6 col-lg-5 section-md-t3">
                                        <div className="title-box-d">
                                            <h3 className="title-d">
                                                Our Missions
                                                {/* <span className="color-d">porttitor</span> lectus */}
                                                {/* <br /> nibh. */}
                                            </h3>
                                        </div>
                                        <p className="color-text-a">
                                            Our mission is to simplify the home-finding process by providing a comprehensive, easy-to-use platform that caters to all your real estate needs. We are dedicated to helping individuals and families find a place they can truly call home. Our team is passionate about making your home search as smooth and enjoyable as possible."
                                        </p>
                                        <p className="color-text-a">
                                            "Our mission at Home Spaces is to redefine the home search experience by combining innovative technology with a human touch. We aim to empower our users with the tools and resources they need to make informed decisions about their next home. By offering a wide range of verified listings, personalized search options, and expert advice, we strive to remove the complexities from the real estate process. Our goal is to build a community where every individual feels confident and supported in their journey to finding a home that truly fits their lifestyle and needs."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-agents section-t8">
                    <div className="container">
                        <div className="row ">
                            <div className="col-md-12">
                                <div className="title-wrap d-flex justify-content-between">
                                    <div className="title-box">
                                        <h2 className="title-a">Why Choose Us</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 section-t8 position-relative">
                                <div className="row ">
                                    <div className="col-md-6 col-lg-5">
                                        <img
                                            src="/assets/assets/img/about5.jpg"
                                            alt=""
                                            className=" img-fluid"
                                        />
                                    </div>
                                    <div className="col-lg-1  d-none d-lg-block position-relative">
                                        {/* <div className="title-vertical d-flex justify-content-start">
                                            <span>HomeQuest Exclusive Property</span>
                                        </div> */}
                                    </div>
                                    <div className="col-md-6 col-lg-5 section-md-t3">
                                        {/* <div className="title-box-d">
                                            <h3 className="title-d">
                                                Our Missions
                                                <span className="color-d">porttitor</span> lectus
                                                <br /> nibh.
                                            </h3>
                                        </div> */}
                                        <p className="color-text-a">
                                        Choosing Home Spaces means choosing a partner who is dedicated to your satisfaction. We stand out because:
                                        </p>
                                        <p className="color-text-a">
                                            <ul>
                                                <li><strong>User-Centric Approach:</strong> Your needs are at the heart of everything we do.</li>
                                                <li><strong>Innovative Technology:</strong> We leverage the latest technology to provide a seamless online experience.</li>
                                                <li><strong>Comprehensive Support:</strong> Our support doesn’t end once you find a home. We’re here to assist with all post-rental or purchase needs.</li>
                                                <li><strong>Community Focused:</strong> We are committed to building strong communities by connecting people with homes that suit their lifestyles and aspirations."
                                                </li>
                                            </ul>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End About Section*/}
            </main>
            {/* End #main */}

        </>
	)
}
