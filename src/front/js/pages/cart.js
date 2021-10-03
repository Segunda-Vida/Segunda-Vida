import React, { useState, useContext, useEffect } from "react";
import { Navbar } from "../component/navbar.js";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { StripeButton } from "../component/StripeButton.js";

export const Cart = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();

	const removeItem = () => console.log("remove");

	const total = store.cart.reduce((acc, cur) => acc + 1 * cur.price, 0);

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

			<div className="container">
				<div className="table" style={{ border: "3px solid green", display: "table" }}>
					<div className="theader" style={{ display: "table-header-group" }}>
						<div className="tr" style={{ display: "table-row" }}>
							<div className="th" style={{ display: "table-cell" }}>
								<strong>Imagen</strong>
							</div>
							<div className="th" style={{ display: "table-cell" }}>
								<strong>Producto</strong>
							</div>
							<div className="th" style={{ display: "table-cell" }}>
								<strong>Precio</strong>
							</div>
							<div className="th" style={{ display: "table-cell" }}></div>
						</div>
					</div>

					<div className="tbody" style={{ display: "table-row-group" }}>
						{store.cart.map((item, key) => (
							<div className="tr" style={{ display: "table-row" }} key={key}>
								<div className="td" style={{ display: "table-cell" }}>
									<img src={item.product_image_url[0]} style={{ height: "50px", width: "50px" }} />
								</div>
								<div className="td" style={{ display: "table-cell" }}>
									{item.name}
								</div>
								<div className="td" style={{ display: "table-cell" }}>
									{item.price}
								</div>

								<div className="td" style={{ display: "table-cell" }}>
									<button
										className="remove btn btn-outline-success my-2 my-sm0"
										onClick={() => actions.quitCart(item)}
										type="submit"
										href="#">
										<i className="far fa-trash-alt"></i>
									</button>
								</div>
							</div>
						))}
					</div>
					<div className="tfooter" style={{ display: "table-footer-group", justifyContent: "center" }}>
						<div className="tr" style={{ display: "table-row" }}>
							<div className="td" style={{ display: "table-cell" }}></div>
							<div className="td" style={{ display: "table-cell" }}></div>
							<div className="td" style={{ display: "table-cell" }}>
								<strong>Total: {total}€</strong>
							</div>
							<div className="td" style={{ display: "table-cell" }}>
								<StripeButton totalAmount={total} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
