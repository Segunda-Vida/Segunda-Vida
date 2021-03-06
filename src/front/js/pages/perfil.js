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
			<div className="container">
				<div className="row">
					<div className="col" style={{ textAlign: "center" }}>
						<div style={{ display: "block" }}>
							<div
								style={{
									borderRadius: "25px",
									border: "2px solid rgb(96, 96, 248)",
									backgroundColor: "rgb(96,96,248)",
									padding: "50px",
									boxShadow: "0 0 5px 5px rgb(96,96,248)",
									display: "block"
								}}>
								<h2 id="Titulo">DATOS PERSONALES</h2>
								<img className="perfImg" src={store.user_nick.user_img} />
								<p id="p1" style={{ color: "white" }}>
									Nick de usuario: {store.user_nick.nickname}
								</p>
								<p id="p1" style={{ color: "white" }}>
									E-mail: {store.user_nick.email}
								</p>
								<div>
									<h2 id="Titulo">DIRECCIÓN ENVÍOS</h2>
								</div>
								<div style={{ display: "flex", justifyContent: "center" }}>
									<p id="p1" style={{ color: "white", margin: "5px" }}>
										{" "}
										Dirección : {store.user_nick.direction}
									</p>
									<p id="p1" style={{ color: "white", margin: "5px" }}>
										{" "}
										{store.user_nick.postal_code}
									</p>
									<p id="p1" style={{ color: "white", margin: "5px" }}>
										{" "}
										{store.user_nick.poblation}, {store.user_nick.provence}
									</p>
									<p id="p1" style={{ color: "white", margin: "5px" }}>
										({store.user_nick.country})
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
