import React, { useState, useContext, useEffect } from "react";
import { Navbar } from "../component/navbar.js";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { StripeButton } from "../component/StripeButton.js";
import { Sidebar } from "../component/sidebar.js";

export const Cart = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();

	const total = store.cart.reduce((acc, cur) => acc + 1 * cur.price, 0);
	const iva = store.cart.reduce((acc, cur) => acc + 1 * cur.price * 1.21, 0);

	useEffect(() => {
		actions.getProduct(id);
		actions.getPrAll();
	}, []);

	return (
		<div>
			<Navbar />
			<Sidebar />

			<div className="container">
				<div
					className="table"
					style={{
						border: "1px solid rgb(96, 96, 248)",
						display: "table",
						marginTop: "50px",
						marginLeft: "20px",
						marginRight: "20px",
						backgroundImage:
							"url(https://www.wallpapertip.com/wmimgs/3-34573_blue-wallpaper-hd-blue-and-white-hd.jpg)"
					}}>
					<div className="theader" style={{ display: "table-header-group" }}>
						<div className="tr" style={{ display: "table-row" }}>
							<div
								className="th"
								style={{ display: "table-cell", borderBottom: "1px solid rgb(96, 96, 248)" }}>
								<strong>Imagen</strong>
							</div>
							<div
								className="th"
								style={{ display: "table-cell", borderBottom: "1px solid rgb(96, 96, 248)" }}>
								<strong>Producto</strong>
							</div>
							<div
								className="th"
								style={{ display: "table-cell", borderBottom: "1px solid rgb(96, 96, 248)" }}>
								<strong>Precio</strong>
							</div>
							<div
								className="th"
								style={{ display: "table-cell", borderBottom: "1px solid rgb(96, 96, 248)" }}></div>
							<div
								className="th"
								style={{ display: "table-cell", borderBottom: "1px solid rgb(96, 96, 248)" }}></div>
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
										className="remove btn btn-outline-primary my-2 my-sm0"
										onClick={() => actions.quitCart(item)}
										type="submit"
										href="#">
										<i className="far fa-trash-alt"></i>
									</button>
								</div>
								<div className="td" style={{ display: "table-cell" }}></div>
							</div>
						))}
					</div>
					<div className="tfooter" style={{ display: "table-footer-group", justifyContent: "center" }}>
						<div className="tr" style={{ display: "table-row" }}>
							<div
								className="td"
								style={{ display: "table-cell", borderTop: "1px solid rgb(96, 96, 248)" }}></div>
							<div
								className="td"
								style={{ display: "table-cell", borderTop: "1px solid rgb(96, 96, 248)" }}></div>
							<div
								className="td"
								style={{ display: "table-cell", borderTop: "1px solid rgb(96, 96, 248)" }}>
								<strong>Total sin IVA: {total}€</strong>
							</div>
							<div
								className="td"
								style={{ display: "table-cell", borderTop: "1px solid rgb(96, 96, 248)" }}>
								<strong>Total con Iva: {iva}€</strong>
							</div>
							<div
								className="td"
								style={{ display: "table-cell", borderTop: "1px solid rgb(96, 96, 248)" }}>
								<StripeButton totalAmount={iva} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
