import React, { useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { Navbar } from "../component/navbar";

export const ProductDetail = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();

	useEffect(() => {
		actions.getProduct(id);
		actions.getPrAll();
		setTimeout(() => {
			console.log("producto detail", store.product);
		}, 3000);
	}, []);

	const otherImages = array => {
		let temp = [];
		for (let i = 1; i < array.length; i++) {
			temp.push(array[i]);
		}
		return temp;
	};
	return !!store.product ? (
		<div>
			<Navbar />
			<center>
				<div className="container">
					<div className="card-deck">
						<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
							<div className="carousel-inner">
								<div className="carousel-item active">
									<img
										src={store.product.product_image_url[0]}
										className="card-img-top"
										alt="..."
										style={{
											width: "300px",
											height: "600px",
											margin: "5px",
											border: "1px solid black"
										}}
									/>
								</div>
								{otherImages(store.product.product_image_url).map((item, key) => (
									<div className="carousel-item" key={key}>
										<img
											src={item}
											style={{
												width: "300px",
												height: "600px",
												margin: "5px",
												border: "1px solid black"
											}}
										/>
									</div>
								))}
							</div>

							<a
								className="carousel-control-prev"
								href="#carouselExampleControls"
								role="button"
								data-slide="prev">
								<span style={{ fontSize: "50px" }}>
									<i className="fa fa-angle-left" aria-hidden="true" style={{ color: "green" }}></i>
								</span>
								<span className="sr-only">Previous</span>
							</a>
							<a
								className="carousel-control-next"
								href="#carouselExampleControls"
								role="button"
								data-slide="next">
								<span style={{ fontSize: "50px" }}>
									<i className="fa fa-angle-right" aria-hidden="true" style={{ color: "green" }} />
								</span>
								<span className="sr-only">Next</span>
							</a>
						</div>

						<div className="card-body">
							<h3 className="card-title">Nombre: {store.product.name}</h3>
							<p className="card-text">
								<h3>Marca: {store.product.brand}</h3>

								<h3>Description: {store.product.description}</h3>

								<h3>Precio: {store.product.price}</h3>
							</p>

							{store.cart.length > 0 && store.cart.includes(store.product) ? (
								<button className="btn btn-warning" style={{ marginRight: "5px" }}>
									<i className="fas fa-cart-arrow-down"> Ya en el carrito</i>
								</button>
							) : (
								<button
									className="btn btn-outline-success my-2 my-sm0"
									type="submit"
									href="#"
									style={{ marginRight: "5px" }}>
									<i
										className="fas fa-cart-arrow-down"
										onClick={() => actions.AddCart(store.product)}>
										{" "}
										Añadir al carrito
									</i>
								</button>
							)}
						</div>
					</div>
				</div>
			</center>
		</div>
	) : (
		<h1>Cargando...</h1>
	);
};
