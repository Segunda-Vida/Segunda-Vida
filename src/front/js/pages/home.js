import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";
import Toastr from "toastr2";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const toastr = new Toastr();

	useEffect(() => {
		actions.getPrAll();
		actions.bought();

		if (store.isAuthenticate) {
			actions.getPrUser();
			actions.getUserNick();
		}
	}, [store.isAuthenticate]);

	useEffect(() => {
		actions.getPrAll();
	}, []);
	console.log("comprado", store.isBougth);

	useEffect(() => {
		toastr.success(store.mensaje, "", {
			timeOut: 2000,
			closeButton: true,
			progressBar: true,
			preventDuplicates: true
		});
	}, [store.user_regis]);

	useEffect(() => {
		if (store.user_log === true) {
			toastr.success(store.mensaje, "", {
				timeOut: 2000,
				closeButton: true,
				progressBar: true,
				preventDuplicates: true
			});
		} else {
			toastr.error(store.mensaje, "", {
				timeOut: 2000,
				closeButton: true,
				progressBar: true,
				preventDuplicates: true
			});
		}
	}, [store.user_log]);

	return (
		<div>
			<div>
				<Navbar />
			</div>

			<div className="container-fluid" id="cont1">
				<div className="text-center mt-5">
					{store.isAuthenticate ? (
						<div>
							{!!store.user_nick && (
								<div>
									<img
										src="https://ci6.googleusercontent.com/proxy/f58kg40ctZ-DjhiD6L9M9vEpMSPGkplGEqNHtYRsfVq_6h6l-DjWCLl8TnIbby73psRpjEHcNTu6_70ATCRiqT3BPAqvUv5aJEYg4-sFQ1Tcu_3lpaTb_pMAMmci9apZMibcvAXe5fZ3t2Wk4_RaEFg0eQ=s0-d-e1-ft#https://api.freelogodesign.org/files/287dfdcf9dcb476399e52fabe7cd0308/thumb/logo_200x200.png?v=0"
										style={{
											width: "150px",
											height: "150px"
										}}
									/>
									<h2 id="Titulo2">
										Estos son nuestros productos a la venta, {store.user_nick.nickname}
									</h2>
								</div>
							)}
						</div>
					) : (
						<div>
							<img
								src="https://ci6.googleusercontent.com/proxy/f58kg40ctZ-DjhiD6L9M9vEpMSPGkplGEqNHtYRsfVq_6h6l-DjWCLl8TnIbby73psRpjEHcNTu6_70ATCRiqT3BPAqvUv5aJEYg4-sFQ1Tcu_3lpaTb_pMAMmci9apZMibcvAXe5fZ3t2Wk4_RaEFg0eQ=s0-d-e1-ft#https://api.freelogodesign.org/files/287dfdcf9dcb476399e52fabe7cd0308/thumb/logo_200x200.png?v=0"
								style={{ width: "150px", height: "150px" }}
							/>
							<h2 id="Titulo2">Bienvenido, estos son nuestros productos a la venta</h2>
						</div>
					)}
				</div>

				{store.list.map(item => {
					let images = JSON.parse(item.product_image_url);
					console.log(images);
					if (item === store.devolutionProd && store.isBougth === true) {
						return null;
					} else {
						return (
							<div
								className="flip-container"
								key={item.id}
								style={{
									width: "300px",
									height: "400px",
									display: "inline-flex",
									flexDirection: "column",
									margin: "30px 30px 80px 30px",
									backgroundColor: "transparent",
									perspective: "1000px",
									border: "2px solid rgb(96, 96, 248)",
									borderRadius: "25px"
								}}>
								<div className="card">
									<div className="front">
										<img
											src={images[0]}
											className="card-img-top"
											style={{
												width: "200px",
												height: "200px",
												alignSelf: "center",
												margin: "20px"
											}}
										/>
										<h5
											id="cardTitle"
											className="card-title"
											style={{
												textAlign: "center",
												marginTop: "40px",
												color: "rgb(96, 96, 248)",
												fontFamily: "Lobster, cursive"
											}}>
											{" "}
											{item.name}
										</h5>
										<p id="p1" className="card-text text-center" style={{ margin: "10px" }}>
											{item.price}€
										</p>
									</div>
									<div className="back">
										<p id="p1" className="card-text text-center" style={{ margin: "50px" }}>
											{item.description}
										</p>
										<Link to={`/productDetail/${item.id}`}>
											<button name="submitSave" className="btn btn-outline-primary my-2 my-sm-0">
												Para mas detalles, click aquí
											</button>
										</Link>
									</div>
								</div>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};
