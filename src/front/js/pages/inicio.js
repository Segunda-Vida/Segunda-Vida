import React from "react";
import { Link } from "react-router-dom";

export const Inicio = () => {
	return (
		<div className="text-center mt-5">
			<h1>SEGUNDA VIDA</h1>
			<h2> Bienvenidos a nuestra tienda online de productos de segunda mano.</h2>
			<h2>Aqui vais a encontrar productos de buena calidad y vendedores de confianza.</h2>
			<h2>Sin gastos de portes en el transporte de envios y de rapida entrega al cliente.</h2>
			<h2>Metodos de pago seguros.</h2>
			<h2>En caso de que el producto no sea de su agrado, es posible la devolución sin cargo</h2>
			<Link to="/Home">
				<button>Entrar</button>
			</Link>
		</div>
	);
};
