import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Sidebar } from "../component/sidebar";
import { Link } from "react-router-dom";

export const Perfil = () => {
	const { store, actions } = useContext(Context);

	$("#myModal4").modal("hide");

	useEffect(() => {
		actions.getUserNick();
	}, []);

	return (
		<div className="imgFondo">
			<Navbar />
			<Sidebar />

			<div className="container" style={{ width: "100%" }}>
				<div className="row">
					<div className="col" style={{ textAlign: "center" }}>
						<div style={{ display: "block" }}>
							<div
								style={{
									border: "2px solid rgb(96, 96, 248)",
									borderRadius: "25px"
								}}>
								<h2>DATOS PERSONALES</h2>
								<h6>Nick de usuario: {store.user_nick.nickname}</h6>
								<h6>E-mail: {store.user_nick.email}</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
