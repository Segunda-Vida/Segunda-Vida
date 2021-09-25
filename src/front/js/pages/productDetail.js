import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import { Navbar } from "../component/navbar";

export const ProductDetail = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();

	useEffect(() => {
		actions.getProduct(id);
	}, []);
	return (
		<div>
			<Navbar />
			<div className="card-deck">
				<div className="card">
					<img
						src={store.product.product_image_url}
						className="card-img-top"
						style={{ width: "100px", height: "160px" }}
					/>
					<div className="card-body">
						<h1 className="card-title">Nombre: {store.product.name}</h1>
						<p className="card-text">
							<h3>Marca</h3>
							<h4>{store.product.brand}</h4>
							<h3>Description</h3>
							<h4>{store.product.description}</h4>
							<h3>Precio</h3>
							<h4>{store.product.price}</h4>
						</p>
						<p className="card-text">
							<small className="text-muted">Last updated 3 mins ago</small>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
