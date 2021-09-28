import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Perfil = () => {
	const [nickname, setNickname] = useState("");

	const { store, actions } = useContext(Context);

	const { user_id } = useParams();

	useEffect(user_id => {
		actions.getPrUser(user_id);
	}, []);

	return (
		<div className="container">
			<div style={{ marginBottom: "30px" }}>
				<Navbar />
				<h1>Tu perfil</h1>
				<h5>Aquí podrás ver y editar tus datos de perfil</h5>
			</div>
			<h6>Imágenes de perfil</h6>
			<div className="column">
				<div className="row" style={{ alignItems: "center" }}>
					<p>Foto principal</p>
					<button className="btn btn-outline-success my-2 my-sm0" type="submit" href="#">
						{" "}
						<i className="fas fa-upload"> Cargar imagen</i>
					</button>
				</div>

				<h6>Información pública</h6>
				<div>
					<ul>
						<li style={{ margin: "20px" }}>
							<input type="text" placeholder="Ingresar Nickname" value={nickname} />
						</li>
						<li style={{ margin: "20px" }}>
							<input type="text" placeholder="Dirección de envío" />
						</li>
						<li style={{ margin: "20px" }}>
							<input type="email" placeholder="Mail de contacto" />
						</li>
						<li style={{ margin: "20px" }}>
							<input type="password" placeholder="Modificar password" />
						</li>
						<button className="btn btn-outline-success my-2 my-sm0" type="submit" href="#">
							<i className="fas fa-save"> Validar</i>
						</button>
					</ul>
				</div>
			</div>
			<div>
				<Link to="/productProfile">
					<button
						onClick={() => {
							store.user_p;
						}}>
						VAAAAAAA
					</button>
				</Link>
			</div>
		</div>
	);
};
