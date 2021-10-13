import React from "react";
import { Link } from "react-router-dom";

export const Inicio = () => {
	return (
		<div className="container text-center">
			<div
				style={{
					display: "inline-list-item",
					justifyContent: "center",
					alignItems: "center",
					marginTop: "15%",
					marginBottom: "20%"
				}}>
				<h1 id="Titulo">SEGUNDA VIDA</h1>
				<h2> Bienvenidos a nuestra tienda online de productos de segunda mano.</h2>
				<h2>Aqui vais a encontrar productos de buena calidad y vendedores de confianza.</h2>
				<h2>Sin gastos de portes en el transporte de envios y de rapida entrega al cliente.</h2>
				<h2>Metodos de pago seguros.</h2>
				<h2>En caso de que el producto no sea de su agrado, es posible la devolución sin cargo</h2>
				<Link to="/Home">
					<button
						className="btn btn-outline-success my-2 my-sm0"
						type="submit"
						href="#"
						style={{ marginRight: "5px" }}>
						<i className="fas fa-door-open">Entrar</i>
					</button>
				</Link>
			</div>
		</div>
	);
};
