import React from "react";
import StripeCheckout from "react-stripe-checkout";
import PropTypes from "prop-types";

export const StripeButton = props => {
	console.log(props.totalAmount);
	const getToken = token => {
		console.log("pago", token);
	};

	return (
		<StripeCheckout
			label="Pagar ahora"
			name="Tienda X"
			billingAddress
			shippingAddress
			description={`Tu total es ${props.totalAmount}`}
			panelLabel="Pagar ahora"
			token={getToken}
			stripeKey="pk_test_Dt4ZBItXSZT1EzmOd8yCxonL"
			amount={parseInt(props.totalAmount * 100)}
			currency="EUR"
			locale="es"
		/>
	);
};

StripeButton.propTypes = {
	totalAmount: PropTypes.number
};
