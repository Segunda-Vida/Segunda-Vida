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
		actions.getUserNick();
		actions.bought();

		if (store.isAuthenticate) {
			actions.getPrUser();
		}
	}, [store.isAuthenticate]);

	console.log("comprado", store.isBougth);

	return (
		<div id="cont1">
			<div>
				<Navbar />
				<Sidebar />
			</div>

			<div className="container" style={{ marginTop: "92.67px" }}>
				<div className="text-center mt-5">
					{store.isAuthenticate ? (
						<div style={{ backgroundColor: "white" }}>
							{!!store.user_nick && (
								<div style={{ backgroundColor: "white" }}>
									<h2 id="Titulo2">Hola {store.user_nick.nickname} Bienvenido</h2>
								</div>
							)}
						</div>
					) : (
						<div style={{ backgroundColor: "white" }}>
							<h2 id="Titulo2">Bienvenido</h2>
						</div>
					)}
				</div>
				<div style={{ backgroundColor: "white" }}>
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
								className="container-fluid "
								key={item.id}
								style={{
									width: "18rem",
									display: "inline-flex",
									flexDirection: "column",
									margin: "30px"
								}}>
								<div className="card" style={{ border: "2px solid black" }}>
									<img
										src={images[0]}
										className="card-img-top"
										style={{
											width: "100px",
											height: "160px",
											alignSelf: "center",
											marginTop: "5px"
										}}
									/>
									<div className="card-body">
										<h5
											id="cardTitle"
											className="card-title"
											style={{
												border: "3px solid green",
												textAlign: "center",
												textTransform: "uppercase"
											}}>
											{" "}
											{item.name}
										</h5>
										<p id="p1" className="card-text text-center">
											{item.description}
										</p>
										<p id="p1" className="card-text text-center">
											{item.price}€
										</p>
										<p className="card-text">
											<Link to={`/productDetail/${item.id}`}>
												<button
													name="submitSave"
													className="btn btn-outline-success my-2 my-sm-0">
													Para mas detalles, click aquí
												</button>
											</Link>
										</p>
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
