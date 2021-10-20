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
							<h1>Tus productos</h1>
						</div>
					) : (
						<>
							<h1>Registrate</h1>
						</>
					)}
				</div>

				{!!store.user_p &&
					store.user_p.map(item => {
						let images = JSON.parse(item.product_image_url);
						console.log(images);

						return (
							<div
								className="container-fluid "
								key={item.id}
								style={{
									width: "18rem",
									display: "inline-flex",
									flexDirection: "column",
									margin: "30px",
									border: "2px solid rgb(96, 96, 248)",
									borderRadius: "25px"
								}}>
								<div className="card">
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
										<h5 className="card-title card-text text-center "> {item.name}</h5>
										<p className="card-text card-text text-center">{item.description}</p>
										<p className="card-text">
											<Link to={`/productDetail/${item.id}`}>
												<button
													name="submitSave"
													className="btn btn-outline-primary my-2 my-sm-0">
													Para mas detalles, click aquí
												</button>
											</Link>
										</p>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};
