import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Sidebar } from "../component/sidebar";

export const ProductProfile = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();

	useEffect(() => {
		actions.getPrUser();
	}, []);

	return (
		<div>
			<Navbar />
			<Sidebar />
			<div className="container">
				<div className="text-center mt-5">
					<div className="container"></div>
				</div>
				<div className="text-center mt-5">
					{store.isAuthenticate ? (
						<div>
							<h1 id="Titulo2">Tus productos</h1>
						</div>
					) : (
						<>
							<h1 id="Titulo2">Registrate</h1>
						</>
					)}
				</div>

				{!!store.user_p &&
					store.user_p.map(item => {
						let images = JSON.parse(item.product_image_url);
						console.log(images);

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
					})}
			</div>
		</div>
	);
};
