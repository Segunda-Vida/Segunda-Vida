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

			{store.list.map(item => {
				let images = JSON.parse(item.product_image_url);
				console.log(images);
				return (
					<div className="container" key={item.id} style={{ margin: "50px" }}>
						<div className="card-deck, row">
							<div className="card, col-6">
								{images[0] ? (
									<img
										src={images[0]}
										className="card-img-top"
										style={{ width: "100px", height: "160px", margin: "30px" }}
									/>
								) : null}
								{images[1] ? (
									<img
										src={images[1]}
										className="card-img-top"
										style={{ width: "100px", height: "160px" }}
									/>
								) : null}
								{images[2] ? (
									<img
										src={images[2]}
										className="card-img-top"
										style={{ width: "100px", height: "160px" }}
									/>
								) : null}

								<div className="card-body">
									<h1 className="card-title">Nombre: {item.name}</h1>
									<p className="card-text">
										<h3>Marca</h3>
										<h4>{item.brand}</h4>
										<h3>Description</h3>
										<h4>{item.description}</h4>
										<h3>Precio</h3>
										<h4>{item.price}</h4>
									</p>
									<p className="card-text">
										<small className="text-muted">Last updated 3 mins ago</small>
									</p>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
