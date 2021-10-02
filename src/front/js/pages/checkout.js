import React, { useState, useEffect, useContext } from "react";
import { StripeButton } from "../component/StripeButton.js";
import { Navbar } from "../component/navbar.js";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const CheckoutPage = () => {
	const [cart, setCart] = useState([
		{
			id: 1,
			name: "t-shirt",
			imageUrl: "",
			qty: 2,
			price: 25
		},
		{
			id: 2,
			name: "cap",
			imageUrl: "",
			qty: 1,
			price: 15
		}
	]);

	const removeItem = () => console.log("remove");

	const total = cart.reduce((acc, cur) => acc + cur.qty * cur.price, 0);

	const { store, actions } = useContext(Context);
	const { id } = useParams();

	useEffect(() => {
		actions.getProduct(id);
		actions.getPrAll();
	}, []);
	const otherImages = array => {
		let temp = [];
		for (let i = 1; i < array.length; i++) {
			temp.push(array[i]);
		}
		return temp;
	};
	return (
		<div>
			<Navbar />
			{store.cart.map((item, key) => (
				<div className="container" style={{ margin: "50px" }} key={key}>
					<div className="card-deck, row">
						<div className="card, col-6">
							<div>
								<img src={item.product_image_url[0]} className="card-img-top" alt="..." />
							</div>
						</div>

						<div className="card-body">
							<h1 className="card-title">Nombre: {item.name}</h1>
							<p className="card-text">
								<h3>Marca: {item.brand}</h3>

								<h3>Description: {item.description}</h3>

								<h3>Precio: {item.price}</h3>
							</p>
						</div>
					</div>
				</div>
			))}

			<div className="checkout-page">
				<div className="head-block">
					<span className="description">Description</span>
					<span className="quantity">Quantity</span>
					<span className="remove">Remove</span>
					<span className="Price">Price</span>
				</div>
				<div className="content-block">
					{cart.map(item => (
						<div className="item" key={item.id}>
							<div className="description">
								<img src={""} alt="" />
								<h4>{item.name}</h4>
							</div>
							<div className="quantity">
								<span>{item.qty}</span>
							</div>
							<div className="remove" onClick={() => removeItem(item)}>
								X
							</div>
							<div className="price">$ {item.price}</div>
						</div>
					))}
				</div>
				<div className="total">Total: ${total}</div>
				<StripeButton totalAmount={total} />
			</div>
		</div>
	);
};
