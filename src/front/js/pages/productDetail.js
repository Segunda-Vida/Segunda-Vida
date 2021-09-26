import React, { useContext, useEffect, useReducer } from "react";
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

			<div>
				<div className="container" style={{ margin: "50px" }}>
					<div className="card-deck, row">
						<div className="card, col-6">
							{store.list.map(item => {
								let images = JSON.parse(item.product_image_url);
								console.log(images);
								return (
									<div key={item}>
										<img src={images[0]} className="card-img-top" alt="..." />
									</div>
								);
							})}
						</div>

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
		</div>
	);
};
