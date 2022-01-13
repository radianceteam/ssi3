import React, {useEffect, useState} from "react";

import {HashRouter as Router, Link, Redirect} from "react-router-dom";

import imagen1 from "./images/n1.jpg";
import imagen2 from "./images/n2.jpg";
import imagen3 from "./images/n3.jpg";
import imagen4 from "./images/n4.jpg";
import imagen5 from "./images/n5.jpg";
import imagen6 from "./images/n6.jpg";

import lock from "./images/lock.png";

import Slider from "react-slick";

function StartPage() {
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		console.log(sessionStorage.token);
		if (sessionStorage.token != undefined) {
			console.log(1);
			setRedirect(true);
		}
	});

	let settings2 = {
		arrows: false,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 690,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	};

	return (
		<>
			{/* <div class="darkBg"></div> */}

			<div class="title">Movies for the evening</div>

			<section class="w3l-grids">
				<div class="grids-main py-5">
					<div class="container py-lg-3">
						<div class="headerhny-title">
							<div class="w3l-title-grids">
								<div class="headerhny-left">
									<h3 class="hny-title">New Releases</h3>
								</div>
							</div>
						</div>
						<div class="owl-three owl-carousel owl-theme">
							<Slider {...settings2}>
								<div class="item vhny-grid">
									<div class="box16 mb-0">
										<a href="#">
											<figure>
												<img class="img-fluid" src={imagen3} alt="" />
											</figure>
											<div class="box-content">
												<h4>
													{" "}
													<span class="post">
														<span class="fa fa-clock-o"> </span> 2 Hr 4min
													</span>
													<span class="post fa fa-heart text-right"></span>
												</h4>
											</div>
											<span
												class="fa fa-play video-icon"
												aria-hidden="true"
											></span>
										</a>
									</div>
									<h3>
										{" "}
										<a class="title-gd" href="#">
											Free Guy
										</a>
									</h3>
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
									<div class="button-center text-center mt-4">
										<a href="#" class="btn watch-button">
											Watch now
										</a>
									</div>
								</div>
								<div class="item vhny-grid">
									<div class="box16 mb-0">
										<a href="#">
											<figure>
												<img class="img-fluid" src={imagen4} alt="" />
											</figure>
											<div class="box-content">
												<h4>
													{" "}
													<span class="post">
														<span class="fa fa-clock-o"> </span> 2 Hr 4min
													</span>
													<span class="post fa fa-heart text-right"></span>
												</h4>
											</div>
											<span
												class="fa fa-play video-icon"
												aria-hidden="true"
											></span>
										</a>
									</div>
									<h3>
										{" "}
										<a class="title-gd" href="#">
											My Spy
										</a>
									</h3>
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
									<div class="button-center text-center mt-4">
										<a href="#" class="btn watch-button">
											Watch now
										</a>
									</div>
								</div>
								<div class="item vhny-grid">
									<div class="box16 mb-0">
										<a href="#">
											<figure>
												<img class="img-fluid" src={imagen5} alt="" />
											</figure>
											<div class="box-content">
												<h4>
													{" "}
													<span class="post">
														<span class="fa fa-clock-o"> </span> 2 Hr 4min
													</span>
													<span class="post fa fa-heart text-right"></span>
												</h4>
											</div>
											<span
												class="fa fa-play video-icon"
												aria-hidden="true"
											></span>
										</a>
									</div>
									<h3>
										{" "}
										<a class="title-gd" href="#">
											Scoob
										</a>
									</h3>
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
									<div class="button-center text-center mt-4">
										<a href="#" class="btn watch-button">
											Watch now
										</a>
									</div>
								</div>
								<div class="item vhny-grid">
									<div class="box16 mb-0">
										<a href="#">
											<figure>
												<img class="img-fluid" src={imagen6} alt="" />
											</figure>
											<div class="box-content">
												<h4>
													{" "}
													<span class="post">
														<span class="fa fa-clock-o"> </span> 2 Hr 4min
													</span>
													<span class="post fa fa-heart text-right"></span>
												</h4>
											</div>
											<span
												class="fa fa-play video-icon"
												aria-hidden="true"
											></span>
										</a>
									</div>
									<h3>
										{" "}
										<a class="title-gd" href="#">
											Downhill
										</a>
									</h3>
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
									<div class="button-center text-center mt-4">
										<a href="#" class="btn watch-button">
											Watch now
										</a>
									</div>
								</div>
							</Slider>
						</div>
					</div>
				</div>
			</section>

			<section class="lock">
				<div class="title lock">
					To unlock all the functions of the cinema - log in with DID
				</div>
				<div class="lock">
					<img src={lock} />
				</div>
			</section>

			{redirect ? <Redirect to="/app" /> : null}

			{/* <div class="modal-connect modal-connect-first page">
				<div class="title">Welcome to the RADIANCE cinema</div>
				<a href="#/connect-wallet">
					<button>Log in with DID</button>
				</a>
			</div> */}
		</>
	);
}

export default StartPage;
