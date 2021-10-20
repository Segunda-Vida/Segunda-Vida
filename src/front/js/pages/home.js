import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";
import { Sidebar } from "../component/sidebar";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getPrAll();
		actions.bought();

		if (store.isAuthenticate) {
			actions.getPrUser();
			actions.getUserNick();
		}
	}, [store.isAuthenticate]);

	console.log("comprado", store.isBougth);

	return (
		<div id="cont1">
			<div>
				<Navbar />
				<Sidebar />
			</div>

			<div className="container">
				<div className="text-center mt-5">
					{store.isAuthenticate ? (
						<div>
							{!!store.user_nick && (
								<div>
									<h2 id="Titulo2">Hola {store.user_nick.nickname} Bienvenido</h2>
								</div>
							)}
						</div>
					) : (
						<div>
							<h2 id="Titulo2">Bienvenido</h2>
						</div>
					)}
				</div>
				<div>
					<h2 id="Titulo3" className="text-center">
						Productos disponibles a la venta
					</h2>
				</div>

				{store.list.map(item => {
					let images = JSON.parse(item.product_image_url);
					console.log(images);
					if (item === store.devolutionProd && store.isBougth === true) {
						return null;
					} else {
						return (
							<div
								className="flip-container "
								key={item.id}
								style={{
									width: "300px",
									height: "400px",
									display: "inline-flex",
									flexDirection: "column",
									margin: "30px",
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
												width: "150px",
												height: "250px",
												alignSelf: "center",
												marginTop: "5px",
												margin: "10px"
											}}
										/>
										<h5
											id="cardTitle"
											className="card-title"
											style={{
												textAlign: "center",
												margin: "10px",
												color: "rgb(96, 96, 248)"
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
