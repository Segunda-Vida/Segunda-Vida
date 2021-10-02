import React, { useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { Navbar } from "../component/navbar";

export const ProductDetail = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();

	useEffect(() => {
		actions.getProduct(id);
		actions.getPrAll();
		setTimeout(() => {
			console.log("producto detail", store.product);
		}, 3000);
	}, []);

	const otherImages = array => {
		let temp = [];
		for (let i = 1; i < array.length; i++) {
			temp.push(array[i]);
		}
		return temp;
	};
	return !!store.product ? (
		<div>
			<Navbar />
			<div className="container" style={{ margin: "50px" }}>
				<div className="card-deck, row">
					<div className="card, col-6">
						<div>
							<img src={store.product.product_image_url[0]} className="card-img-top" alt="..." />
						</div>
					</div>

					<div className="card-body">
						<h1 className="card-title">Nombre: {store.product.name}</h1>
						<p className="card-text">
							<h3>Marca: {store.product.brand}</h3>

							<h3>Description: {store.product.description}</h3>

							<h3>Precio: {store.product.price}</h3>
						</p>

						{store.cart.length > 0 && store.cart.includes(store.product) ? (
							<button className="btn btn-warning" style={{ marginRight: "5px" }}>
								<i className="fas fa-cart-arrow-down"> Ya en el carrito</i>
							</button>
						) : (
							<button
								className="btn btn-outline-success my-2 my-sm0"
								type="submit"
								href="#"
								style={{ marginRight: "5px" }}>
								<i className="fas fa-cart-arrow-down" onClick={() => actions.AddCart(store.product)}>
									{" "}
									Añadir al carrito
								</i>
							</button>
						)}
					</div>
				</div>
				{otherImages(store.product.product_image_url).map((item, key) => (
					<img key={key} src={item} />
				))}
			</div>
		</div>
	) : (
		<h1>Cargando...</h1>
	);
};
