import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = () => {
		actions.login(email, password);
		setEmail("");
		setPassword("");
	};

	const [products, setProducts] = useState([]);
	const [text, setText] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	setProducts(actions.buscador());

	useEffect(() => {
		products;
	}, []);

	const onChangeHandler = text => {
		let matches = [];
		if (text.length > 0) {
			matches = products.filter(product => {
				const regex = new RegExp(`${text}`, "gi");
				return product.name.match(regex);
			});
		}
		setSuggestions(matches);
		setText(text);
	};

	return (
		<div className="container">
			<Navbar />
			<div className="text-center mt-5">
				<div className="container">
					<input
						type="text"
						className="col-md-12 input"
						onChange={e => onChangeHandler(e.target.value)}
						value={text}
						onBlur={() => setSuggestions([])}
					/>
				</div>

				{suggestions &&
					suggestions.map((suggestion, i) => (
						<div
							onClick={() => setText(suggestion.name)}
							key={i}
							className="suggestion col-md-12 justify-content-md-center">
							{suggestion.name}
						</div>
					))}
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

			<div className="card-deck">
				<div className="card">
					<img src="..." className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">Card title</h5>
						<p className="card-text">
							This is a longer card with supporting text below as a natural lead-in to additional content.
							This content is a little bit longer.
						</p>
						<p className="card-text">
							<small className="text-muted">Last updated 3 mins ago</small>
						</p>
					</div>
				</div>
				<div className="card">
					<img src="..." className="card-img-top" alt="..." />

					<div className="card-body">
						<h5 className="card-title">Card title</h5>
						<p className="card-text">
							This card has supporting text below as a natural lead-in to additional content.
						</p>
						<p className="card-text">
							<small className="text-muted">Last updated 3 mins ago</small>
						</p>
					</div>
				</div>
				<div className="card">
					<img src="..." className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">Card title</h5>
						<p className="card-text">
							This is a wider card with supporting text below as a natural lead-in to additional content.
							This card has even longer content than the first to show that equal height action.
						</p>
						<p className="card-text">
							<small className="text-muted">Last updated 3 mins ago</small>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
