import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Sidebar = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<div className="sidebar">
				<div className="Carrito" style={{ margin: "5px" }}>
					<Link to="/cart">
						<i className="fas fa-shopping-cart" style={{ color: "rgb(96, 96, 248)" }}>
							{" "}
							Carrito
						</i>
						<span style={{ color: "rgb(96, 96, 248)" }}> ({store.cart.length})</span>
					</Link>
				</div>
			</div>
		</div>
	);
};
