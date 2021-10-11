import React, { useState, useContext, useEffect } from "react";
import { Navbar } from "../component/navbar.js";
import { Context } from "../store/appContext";

export const Devolucion = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<Navbar />
			{store.devolutionProd.map(item => {
				return (
					<div className="tr" style={{ display: "table-row" }} key={item.id}>
						<div className="td" style={{ display: "table-cell" }}>
							<h1>{item.name}</h1>
							<img src={item.product_image_url[0]} />
						</div>
					</div>
				);
			})}
		</div>
	);
};
