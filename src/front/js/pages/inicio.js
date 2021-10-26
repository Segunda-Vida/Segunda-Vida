import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Inicio = () => {
	useEffect(() => {
		setTimeout(function() {
			window.location.href = "/home";
		}, 5000);
	}, []);

	return (
		<div className="container text-center">
			<div>
				<img
					src="https://ci6.googleusercontent.com/proxy/f58kg40ctZ-DjhiD6L9M9vEpMSPGkplGEqNHtYRsfVq_6h6l-DjWCLl8TnIbby73psRpjEHcNTu6_70ATCRiqT3BPAqvUv5aJEYg4-sFQ1Tcu_3lpaTb_pMAMmci9apZMibcvAXe5fZ3t2Wk4_RaEFg0eQ=s0-d-e1-ft#https://api.freelogodesign.org/files/287dfdcf9dcb476399e52fabe7cd0308/thumb/logo_200x200.png?v=0"
					style={{ width: "200px", height: "200px" }}
				/>
				<div className="text-center">
					<div className="spinner-grow spinner-grow-sm text-primary" role="status" style={{ margin: "2px" }}>
						<span className="sr-only">Loading...</span>
					</div>
					<div className="spinner-grow  spinner-grow-sm text-primary" role="status" style={{ margin: "2px" }}>
						<span className="sr-only">Loading...</span>
					</div>
					<div className="spinner-grow spinner-grow-sm text-primary" role="status" style={{ margin: "2px" }}>
						<span className="sr-only">Loading...</span>
					</div>
				</div>
				<div
					style={{
						border: "1px solid rgb(96,96,248)",
						borderRadius: "25px",
						backgroundImage:
							"url(https://www.wallpapertip.com/wmimgs/3-34573_blue-wallpaper-hd-blue-and-white-hd.jpg)"
					}}>
					<h2 id="Titulo"> CARGANDO PAGINA</h2>

					<h2 style={{ color: "rgb(96, 96, 248)" }}>
						Bienvenidos a nuestra tienda online de productos de segunda mano.
					</h2>
					<h2 style={{ color: "rgb(96, 96, 248)" }}>
						Vais a encontrar productos de buena calidad y vendedores de confianza.
					</h2>
					<h2 style={{ color: "rgb(96, 96, 248)" }}>Metodos de pago seguros.</h2>
					<h2 style={{ color: "rgb(96, 96, 248)" }}>
						En caso de que el producto no sea de su agrado, es posible la devolución sin cargo
					</h2>
				</div>
			</div>
		</div>
	);
};
