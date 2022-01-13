import image1 from "./images/1.jpg";
import image2 from "./images/2.jpg";
import image3 from "./images/3.jpg";
import image4 from "./images/4.jpg";
import image5 from "./images/5.jpg";

import imagea1 from "./images/a1.jpg";
import imagea2 from "./images/a2.jpg";
import imagea3 from "./images/a3.jpg";
import imagea4 from "./images/a4.jpg";
import imagea5 from "./images/a5.jpg";

import imagebanner1 from "./images/banner1.jpg";
import imagebanner2 from "./images/banner2.jpg";
import imagebanner3 from "./images/banner3.jpg";
import imagebanner4 from "./images/banner4.jpg";

import imagec1 from "./images/c1.jpg";
import imagec2 from "./images/c2.jpg";
import imagec3 from "./images/c3.jpg";

import imagem1 from "./images/m1.jpg";
import imagem2 from "./images/m2.jpg";
import imagem3 from "./images/m3.jpg";
import imagem4 from "./images/m4.jpg";
import imagem5 from "./images/m5.jpg";
import imagem6 from "./images/m6.jpg";
import imagem7 from "./images/m7.jpg";
import imagem8 from "./images/m8.jpg";
import imagem9 from "./images/m9.jpg";
import imagem10 from "./images/m10.jpg";
import imagem11 from "./images/m11.jpg";
import imagem12 from "./images/m12.jpg";

import imagemid1 from "./images/mid1.jpg";
import imagemid2 from "./images/mid2.jpg";
import imagemid3 from "./images/mid3.jpg";

import imagen1 from "./images/n1.jpg";
import imagen2 from "./images/n2.jpg";
import imagen3 from "./images/n3.jpg";
import imagen4 from "./images/n4.jpg";
import imagen5 from "./images/n5.jpg";
import imagen6 from "./images/n6.jpg";

import imageteam1 from "./images/team1.jpg";
import imageteam2 from "./images/team2.jpg";
import imageteam3 from "./images/team3.jpg";
import imageteam4 from "./images/team4.jpg";
import imageteam5 from "./images/team5.jpg";
import imageteam6 from "./images/team6.jpg";

import Slider from "react-slick";

function CinemaPage() {
	let settings = {
		arrows: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
	};

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
			{/* <header id="site-header" class="w3l-header fixed-top">
				<nav class="navbar navbar-expand-lg navbar-light fill px-lg-0 py-0 px-3">
					<div class="container container-test">
						<h1>
							<a class="navbar-brand" href="index.html">
								Showcase Cinema{" "}
							</a>
						</h1>
					</div>
				</nav>
			</header> */}

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

			<section class="w3l-mid-slider position-relative section-test">
				<div class="companies20-content">
					<div class="owl-mid owl-carousel owl-theme">
						<Slider {...settings}>
							<div class="item">
								<li>
									<div class="slider-info mid-view bg bg2">
										<div class="container">
											<div class="mid-info">
												<span class="sub-text">Comedy</span>
												<h3>Jumanji: The Next Level</h3>
												<p>2019 ‧ Comedy/Action ‧ 2h 3m</p>
												<a class="watch">
													<span class="fa fa-play" aria-hidden="true"></span>
													Watch Trailer
												</a>
											</div>
										</div>
									</div>
								</li>
							</div>

							<div class="item">
								<li>
									<div class="slider-info mid-view mid-top1 bg bg2">
										<div class="container">
											<div class="mid-info">
												<span class="sub-text">Adventure</span>
												<h3>Dolittle</h3>
												<p>2020 ‧ Family/Adventure ‧ 1h 41m</p>
												<a class="watch">
													<span class="fa fa-play" aria-hidden="true"></span>
													Watch Trailer
												</a>
											</div>
										</div>
									</div>
								</li>
							</div>

							<div class="item">
								<li>
									<div class="slider-info mid-view mid-top2 bg bg2">
										<div class="container">
											<div class="mid-info">
												<span class="sub-text">Action</span>
												<h3>Bad Boys for Life</h3>
												<p>2020 ‧ Comedy/Action ‧ 2h 4m</p>
												<a class="watch">
													<span class="fa fa-play" aria-hidden="true"></span>
													Watch Trailer
												</a>
											</div>
										</div>
									</div>
								</li>
							</div>
						</Slider>
					</div>
				</div>
			</section>
			<section class="w3l-albums py-5" id="projects">
				<div class="container py-lg-4">
					<div class="row">
						<div class="col-lg-12 mx-auto">
							<div id="parentHorizontalTab">
								<ul class="resp-tabs-list hor_1">
									<li>All</li>
									<div class="clear"></div>
								</ul>
								<div class="resp-tabs-container hor_1">
									<div class="albums-content">
										<div class="row">
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagem6}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															Long Shot
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagem5}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															Jumanji
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagem4}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															Little Women
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
											{/* <div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
										<div class="slider-info">
											<div class="img-circle">
												<a href="#"><img src={imagem1} class="img-fluid"
														alt="author image"/>
													<div class="overlay-icon">

														<span class="fa fa-play video-icon" aria-hidden="true"></span>
													</div>
												</a>
											</div>
											<div class="message">
												<p>English</p>
												<a class="author-book-title" href="#">Rocketman</a>
												<h4> <span class="post"><span class="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

													<span class="post fa fa-heart text-right"></span>
												</h4>
											</div>
										</div>

									</div> */}
											{/* <div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
										<div class="slider-info">
											<div class="img-circle">
												<a href="#"><img src={imagem2} class="img-fluid"
														alt="author image"/>
													<div class="overlay-icon">

														<span class="fa fa-play video-icon" aria-hidden="true"></span>
													</div>
												</a>
											</div>
											<div class="message">
												<p>English</p>
												<a class="author-book-title" href="#">Doctor Sleep</a>
												<h4> <span class="post"><span class="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

													<span class="post fa fa-heart text-right"></span>
												</h4>
											</div>
										</div>

									</div>  */}
											{/* <div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
										<div class="slider-info">
											<div class="img-circle">
												<a href="#"><img src={imagem3} class="img-fluid"
														alt="author image"/>
													<div class="overlay-icon">

														<span class="fa fa-play video-icon" aria-hidden="true"></span>
													</div>
												</a>
											</div>
											<div class="message">
												<p>English</p>
												<a class="author-book-title" href="#">Knives Out</a>
												<h4> <span class="post"><span class="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

													<span class="post fa fa-heart text-right"></span>
												</h4>
											</div>
										</div>

									</div> */}
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagen1}
																class="img-fluid"
																alt="author image"
															/>
															<span
																class="fa fa-play video-icon"
																aria-hidden="true"
															></span>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															No Time to Die
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagen2}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															Mulan
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagen3}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															Free Guy
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="albums-content">
										<div class="row">
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagem1}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															Rocketman
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagem2}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															Doctor Sleep
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagem3}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															Knives Out
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagem7}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															Frozen 2
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagem11}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															The Lego
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagem12}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															The Hustle
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
											{/* <div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
										<div class="slider-info">
											<div class="img-circle">
												<a href="#"><img src={imagem8} class="img-fluid"
														alt="author image"/>
													<div class="overlay-icon">

														<span class="fa fa-play video-icon" aria-hidden="true"></span>
													</div>
												</a>
											</div>
											<div class="message">
												<p>English</p>
												<a class="author-book-title" href="#">Toy Story 4</a>
												<h4> <span class="post"><span class="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

													<span class="post fa fa-heart text-right"></span>
												</h4>
											</div>
										</div>

									</div> */}
											{/* <div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
										<div class="slider-info">
											<div class="img-circle">
												<a href="#"><img src={imagem9} class="img-fluid"
														alt="author image"/>
													<div class="overlay-icon">

														<span class="fa fa-play video-icon" aria-hidden="true"></span>
													</div>
												</a>
											</div>
											<div class="message">
												<p>English</p>
												<a class="author-book-title" href="#">Joker</a>
												<h4> <span class="post"><span class="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

													<span class="post fa fa-heart text-right"></span>
												</h4>
											</div>
										</div>

									</div> */}
										</div>
									</div>
									<div class="albums-content">
										<div class="row">
											{/* <div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
										<div class="slider-info">
											<div class="img-circle">
												<a href="#"><img src={imagem7} class="img-fluid"
														alt="author image"/>
													<div class="overlay-icon">

														<span class="fa fa-play video-icon" aria-hidden="true"></span>
													</div>
												</a>
											</div>
											<div class="message">
												<p>English</p>
												<a class="author-book-title" href="#">Frozen 2</a>
												<h4> <span class="post"><span class="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

													<span class="post fa fa-heart text-right"></span>
												</h4>
											</div>
										</div>

									</div> */}
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagem8}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															Toy Story 4
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagem9}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															Joker
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
												</div>
											</div>
											<div class="col-lg-4 new-relise-gd mt-lg-0 mt-0">
												<div class="slider-info">
													<div class="img-circle">
														<a href="#">
															<img
																src={imagem10}
																class="img-fluid"
																alt="author image"
															/>
															<div class="overlay-icon">
																<span
																	class="fa fa-play video-icon"
																	aria-hidden="true"
																></span>
															</div>
														</a>
													</div>
													<div class="message">
														<p>English</p>
														<a class="author-book-title" href="#">
															Alita
														</a>
														<h4>
															{" "}
															<span class="post">
																<span class="fa fa-clock-o"> </span> 2 Hr 4min
															</span>
															<span class="post fa fa-heart text-right"></span>
														</h4>
													</div>
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
			<footer class="w3l-footer">
				<section class="footer-inner-main">
					<div class="below-section">
						<div class="container">
							<div class="copyright-footer">
								<ul class="social text-lg-right">
									<li>Facebook</li>
									<li>LinkedIn</li>
									<li>Twitter</li>
									<li>GooglePlus</li>
								</ul>
							</div>
						</div>
					</div>
					<button onclick="topFunction()" id="movetop" title="Go to top">
						<span class="fa fa-arrow-up" aria-hidden="true"></span>
					</button>
				</section>
			</footer>
		</>
	);
}

export default CinemaPage;
