import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar";

import { Link } from "react-router-dom";
import { nominalTypeHack } from "prop-types";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = () => {
		actions.login(email, password);
		setEmail("");
		setPassword("");
	};

	const [text, setText] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		actions.buscador();
	}, []);

	const onChangeHandler = text => {
		let matches = [];
		if (text.length > 0) {
			matches = store.products.filter(product => {
				const regex = new RegExp(`${text}`, "gi");
				return product.name.match(regex);
			});
		}
		setSuggestions(matches);
		setText(text);
	};

	useEffect(() => {
		actions.getPrAll();
		actions.getUserNick();
		actions.bought();

		if (store.isAuthenticate) {
			actions.getPrUser();
		}
	}, [store.isAuthenticate]);

	console.log("comprado", store.isBougth);

	return (
		<div>
			<Navbar />
			<div className="container">
				<div className="text-center mt-5">
					{store.isAuthenticate ? (
						<div>
							{!!store.user_nick && (
								<div>
									<h2 id="Titulo2">Hola {store.user_nick.nickname} Bienvenido</h2>
								</div>
							)}
						</div>
					) : (
						<div>
							<h2 id="Titulo2">Bienvenido</h2>
						</div>
					)}
				</div>
				<div>
					<h2 id="Titulo3" className="text-center">
						Productos disponibles a la venta
					</h2>
				</div>
				{store.list.map(item => {
					let images = JSON.parse(item.product_image_url);
					console.log(images);
					if (item === store.devolutionProd && store.isBougth === true) {
						return null;
					} else {
						return (
							<div
								className="container-fluid "
								key={item.id}
								style={{
									width: "18rem",
									display: "inline-flex",
									flexDirection: "column",
									margin: "30px"
								}}>
								<div className="card" style={{ border: "2px solid black" }}>
									<img
										src={images[0]}
										className="card-img-top"
										style={{
											width: "100px",
											height: "160px",
											alignSelf: "center",
											marginTop: "5px"
										}}
									/>
									<div className="card-body">
										<h5
											id="cardTitle"
											className="card-title"
											style={{
												border: "3px solid green",
												textAlign: "center",
												textTransform: "uppercase"
											}}>
											{" "}
											{item.name}
										</h5>
										<p id="p1" className="card-text text-center">
											{item.description}
										</p>
										<p id="p1" className="card-text text-center">
											{item.price}€
										</p>
										<p className="card-text">
											<Link to={`/productDetail/${item.id}`}>
												<button
													name="submitSave"
													className="btn btn-outline-success my-2 my-sm-0">
													Para mas detalles, click aquí
												</button>
											</Link>
										</p>
									</div>
								</div>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};
