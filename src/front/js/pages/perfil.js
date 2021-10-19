import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Sidebar } from "../component/sidebar";
import { Link } from "react-router-dom";

export const Perfil = () => {
	const { store, actions } = useContext(Context);

	$("#myModal4").modal("hide");

	return (
		<div className="imgFondo">
			<Navbar />
			<Sidebar />

			<div className="container" style={{ width: "100%" }}>
				<div className="row">
					<div className="col" style={{ textAlign: "center" }}>
						<div style={{ display: "block" }}>
							<div>
								<Link to="/devolucion">
									<button
										className="btn btn-outline-primary my-2 my-sm0"
										type="submit"
										href="#"
										style={{ marginRight: "5px" }}>
										<i className="fas fa-hand-holding-usd">Devoluciones</i>
										<span> ({store.devolutionProd.length})</span>
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
