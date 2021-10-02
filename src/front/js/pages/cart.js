import React, { useState, useContext, useEffect } from "react";
import { Navbar } from "../component/navbar.js";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { StripeButton } from "../component/StripeButton.js";

export const Cart = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();

	const removeItem = () => console.log("remove");

	const total = store.cart.reduce((acc, cur) => acc + cur.id * cur.price, 0);

	useEffect(() => {
		actions.getProduct(id);
		actions.getPrAll();
	}, []);

	useEffect(() => {
		actions.getProduct(id);
		actions.getPrAll();
	}, []);
	const otherImages = array => {
		let temp = [];
		for (let i = 1; i < array.length; i++) {
			temp.push(array[i]);
		}
		return temp;
	};
	return (
		<div>
			<Navbar />

			{store.cart.map((item, key) => (
				<div className="container" style={{ margin: "50px" }} key={key}>
					<div className="card-deck, row">
						<div className="card, col-6">
							<div>
								<img src={item.product_image_url[0]} className="card-img-top" alt="..." />
							</div>
						</div>

						<div className="card-body">
							<h1 className="card-title">Nombre: {item.name}</h1>
							<p className="card-text">
								<h3>Marca: {item.brand}</h3>

								<h3>Description: {item.description}</h3>

								<div className="remove" onClick={() => removeItem(item)}>
									X
								</div>

								<h3>Precio: {item.price}</h3>
							</p>
						</div>
					</div>
				</div>
			))}
			<div className="total">Total: ${total}</div>
			<StripeButton totalAmount={total} />
		</div>
	);
};
