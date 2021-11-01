import React, { useState, useContext, useEffect } from "react";
import { Navbar } from "../component/navbar.js";
import { Context } from "../store/appContext";
import { StripeButton2 } from "../component/StripeButton2";
import { Sidebar } from "../component/sidebar.js";

export const Devolucion = () => {
	const { store, actions } = useContext(Context);

	const devol = store.devolutionProd.reduce((acc, cur) => acc + 1 * cur.price * 1.21 * -1, 0);

	console.log("devolucion", store.devolutionProd);

	return (
		<div>
			<Navbar />

			<div className="container">
				<div
					className="table"
					style={{
						border: "1px solid rgb(96, 96, 248)",
						display: "table",
						marginTop: "150px",
						marginLeft: "20px",
						marginRight: "20px"
					}}>
					<div className="theader" style={{ display: "table-header-group" }}>
						<div className="tr" style={{ display: "table-row" }}>
							<div className="th" style={{ display: "table-cell" }}>
								<p id="p1">Imagen</p>
							</div>
							<div className="th" style={{ display: "table-cell" }}>
								<p id="p1">Producto</p>
							</div>
							<div className="th" style={{ display: "table-cell" }}>
								<p id="p1">Precio</p>
							</div>
							<div className="th" style={{ display: "table-cell" }}></div>
							<div className="th" style={{ display: "table-cell" }}></div>
						</div>
					</div>

					<div className="tbody" style={{ display: "table-row-group" }}>
						{store.devolutionProd.map((item, key) => (
							<div className="tr" style={{ display: "table-row" }} key={key}>
								<div className="td" style={{ display: "table-cell" }}>
									<img src={item.product_image_url[0]} style={{ height: "50px", width: "50px" }} />
								</div>
								<div className="td" style={{ display: "table-cell" }}>
									<p id="p1">{item.name}</p>
								</div>
								<div className="td" style={{ display: "table-cell" }}>
									<p id="p1">{item.price}</p>
								</div>

								<div className="td" style={{ display: "table-cell" }}></div>
							</div>
						))}
					</div>
					<div className="tfooter" style={{ display: "table-footer-group", justifyContent: "center" }}>
						<div className="tr" style={{ display: "table-row" }}>
							<div className="td" style={{ display: "table-cell" }}></div>
							<div className="td" style={{ display: "table-cell" }}></div>

							<div className="td" style={{ display: "table-cell" }}>
								<p id="p1">Total con Iva: {devol}€</p>
							</div>
							<div className="td" style={{ display: "table-cell" }}>
								<StripeButton2 totalAmount={devol} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
