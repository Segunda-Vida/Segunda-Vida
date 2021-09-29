import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const ProductProfile = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();
	const { user_id } = useParams();

	useEffect(() => {
		actions.getProduct(id);
		actions.getPrAll(user_id);
	}, []);

	return (
		<div className="container">
			<Navbar />
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

			{store.list.map(item => {
				let images = JSON.parse(item.product_image_url);
				console.log(images);

				return (
					<div
						className="container-fluid "
						key={item.id}
						style={{ width: "18rem", display: "inline-flex", flexDirection: "column", margin: "30px" }}>
						<div className="card">
							<img
								src={images[0]}
								className="card-img-top"
								style={{ width: "100px", height: "160px", alignSelf: "center" }}
							/>
							<div className="card-body">
								<h5 className="card-title"> {item.user_id}</h5>
								<p className="card-text">{item.description}</p>
								<p className="card-text">
									<Link to={`/productDetail/${item.id}`}>
										<button name="submitSave" className="btn btn-outline-success my-2 my-sm-0">
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
	);
};
