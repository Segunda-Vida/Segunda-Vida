import React, { useState, useContext, useEffect } from "react";
import { Navbar } from "../component/navbar.js";
import { Context } from "../store/appContext";
import { StripeButton2 } from "../component/StripeButton2";

export const Devolucion = () => {
	const { store, actions } = useContext(Context);

	const devol = store.devolutionProd.reduce((acc, cur) => acc + 1 * cur.price * 1.21 * -1, 0);

	console.log("devolucion", store.devolutionProd);

	return (
		<div>
			<Navbar />

			<div className="container">
				<div className="table" style={{ border: "1px solid green", display: "table", marginTop: "50px" }}>
					<div className="theader" style={{ display: "table-header-group" }}>
						<div className="tr" style={{ display: "table-row" }}>
							<div className="th" style={{ display: "table-cell", borderBottom: "1px solid green" }}>
								<strong>Imagen</strong>
							</div>
							<div className="th" style={{ display: "table-cell", borderBottom: "1px solid green" }}>
								<strong>Producto</strong>
							</div>
							<div className="th" style={{ display: "table-cell", borderBottom: "1px solid green" }}>
								<strong>Precio</strong>
							</div>
							<div
								className="th"
								style={{ display: "table-cell", borderBottom: "1px solid green" }}></div>
							<div
								className="th"
								style={{ display: "table-cell", borderBottom: "1px solid green" }}></div>
						</div>
					</div>

					<div className="tbody" style={{ display: "table-row-group" }}>
						{store.devolutionProd.map((item, key) => (
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

								<div className="td" style={{ display: "table-cell" }}></div>
							</div>
						))}
					</div>
					<div className="tfooter" style={{ display: "table-footer-group", justifyContent: "center" }}>
						<div className="tr" style={{ display: "table-row" }}>
							<div className="td" style={{ display: "table-cell", borderTop: "1px solid green" }}></div>
							<div className="td" style={{ display: "table-cell", borderTop: "1px solid green" }}></div>

							<div className="td" style={{ display: "table-cell", borderTop: "1px solid green" }}>
								<strong>Total con Iva: {devol}€</strong>
							</div>
							<div className="td" style={{ display: "table-cell", borderTop: "1px solid green" }}>
								<StripeButton2 totalAmount={devol} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};