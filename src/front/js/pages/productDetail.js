import React, { useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import Toastr from "toastr2";
import { Sidebar } from "../component/sidebar";
import { whileStatement } from "@babel/types";

export const ProductDetail = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();
	const toastr = new Toastr();
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
	return !!store.product && store.product.is_bough === 1 ? (
		<div>
			<Navbar />
			<center>
				<div className="container-fluid">
					<div
						className="card-deck"
						style={{
							display: "inline-block",
							marginTop: "150px",
							border: "1px solid rgb(96, 96, 248)",
							borderRadius: "25%",
							width: "400px",
							height: "500px",
							backgroundColor: "rgb(96,96,248)",
							padding: "30px",
							boxShadow: " 0 0 3px 3px rgb(96,96,248)"
						}}>
						<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
							<div className="carousel-inner">
								<div className="carousel-item active">
									<img
										src={store.product.product_image_url[0]}
										className="card-img-top"
										alt="..."
										style={{
											width: "100px",
											height: "200px",
											margin: "5px",
											border: "1px solid rgb(96, 96, 248)"
										}}
									/>
								</div>
								{otherImages(store.product.product_image_url).map((item, key) => (
									<div className="carousel-item" key={key}>
										<img
											src={item}
											style={{
												width: "100px",
												height: "200px",
												margin: "5px",
												border: "1px rgb(96, 96, 248)"
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
									<i className="fa fa-angle-left" aria-hidden="true" style={{ color: "white" }}></i>
								</span>
								<span className="sr-only">Previous</span>
							</a>
							<a
								className="carousel-control-next"
								href="#carouselExampleControls"
								role="button"
								data-slide="next">
								<span style={{ fontSize: "50px" }}>
									<i className="fa fa-angle-right" aria-hidden="true" style={{ color: "white" }} />
								</span>
								<span className="sr-only">Next</span>
							</a>
						</div>

						<div className="card-body" style={{ color: "white" }}>
							<p id="p1" className="card-title">
								Nombre: {store.product.name}
							</p>

							<p id="p1">Marca: {store.product.brand}</p>

							<p id="p1">Description: {store.product.description}</p>

							<p id="p1">Precio: {store.product.price}</p>
							{store.isAuthenticate ? (
								store.cart.length > 0 && store.cart.includes(store.product) ? (
									<button className="btn btn-navmain" style={{ marginRight: "5px", border: "none" }}>
										<i className="fas fa-cart-arrow-down">
											{" "}
											<p id="p2">Ya en el carrito</p>
										</i>
									</button>
								) : (
									<button
										className="btn btn-add-product my-2 my-sm0"
										onClick={() => actions.AddCart(store.product)}
										style={{ marginRight: "5px", cursor: "pointer" }}>
										<i className="fas fa-cart-arrow-down">
											{" "}
											<p id="p2">A??adir al carrito</p>
										</i>
									</button>
								)
							) : null}
						</div>
					</div>
				</div>
			</center>
		</div>
	) : (
		<Link to="/home">
			<div
				className="center"
				style={{
					border: "1px solid rgb(96, 96, 248)",
					borderRadius: "25%",
					width: "200px",
					height: "200px",
					backgroundColor: "rgb(96,96,248)",
					padding: "30px",
					boxShadow: " 0 0 3px 3px rgb(96,96,248)",
					color: "white",
					fontFamily: "Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
					marginLeft: "auto",
					marginRight: "auto",
					alignItems: "center"
				}}>
				<p id="2">Producto ya comprado o no existe, click aqu?? para regresar a home...</p>
			</div>
		</Link>
	);
};
