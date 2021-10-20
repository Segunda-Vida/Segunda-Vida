import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const Sidebar = () => {
	const { store, actions } = useContext(Context);
	const { user_id } = useParams();

	useEffect(() => {
		if (store.isAuthenticate) {
			actions.getPrUser(user_id);
		}
		actions.getPrAll();
	}, []);

	return (
		<div>
			<div className="sidebar">
				<div style={{ display: "block" }}></div>
				<div className="Carrito" style={{ margin: "5px" }}>
					<Link to="/Perfil">
						<i className="fas fa-users" style={{ color: "rgb(96, 96, 248)" }}>
							{" "}
							Perfil
						</i>
					</Link>
					<Link to="/cart">
						<i className="fas fa-shopping-cart" style={{ color: "rgb(96, 96, 248)" }}>
							{" "}
							Carrito
						</i>
						<span style={{ color: "rgb(96, 96, 248)" }}> ({store.cart.length})</span>
					</Link>
					<Link to={`/productProfile`}>
						<i className="fas fa-box-open" style={{ color: "rgb(96, 96, 248)" }}>
							<br className="text-center" />
							Tus Productos
						</i>
					</Link>
					<Link to="/devolucion">
						<i className="fas fa-hand-holding-usd" style={{ color: "rgb(96, 96, 248)" }}>
							Devoluciones
						</i>
						<span style={{ color: "rgb(96, 96, 248)" }}> ({store.devolutionProd.length})</span>
					</Link>
				</div>
			</div>
		</div>
	);
};
