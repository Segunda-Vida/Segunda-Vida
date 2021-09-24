import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar";

import { Link } from "react-router-dom";

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
	}, []);

	return (
		<div className="container">
			<Navbar />
			<div className="text-center mt-5">
				<div className="container"></div>
			</div>
			<div className="text-center mt-5">
				{store.isAuthenticate ? (
					<div>
						<h1>Bienvenido</h1>
					</div>
				) : (
					<>
						<h1>Registrate</h1>
					</>
				)}
			</div>

			{store.list.map(item => {
				return (
					<div className="card-deck" key={item.id}>
						<div className="card">
							<img src="..." className="card-img-top" alt="..." />
							<div className="card-body">
								<h5 className="card-title"> {item.name}</h5>
								<p className="card-text">{item.description}</p>
								<p className="card-text">
									<Link to={`/productDetail/${item.id}`}>
										<button>Para mas detalla pincha aquy</button>
									</Link>
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
