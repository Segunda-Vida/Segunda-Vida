import React, { useState } from "react";
import StripeButton from "../component/StripeButton.js";

const CheckoutPage = () => {
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

	return (
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
	);
};

export default CheckoutPage;
