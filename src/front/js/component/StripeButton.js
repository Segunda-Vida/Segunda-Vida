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
			stripeKey="pk_test_51JhJX3IHIDAJZNNpBOQGK09lpcxR0mnbaLwZ9garvNQ6SgxyQQEaWEeDFPMZwqMZeG4OhIpuWG0Wmy3HUVAWjuJ300Eqw3gDlE"
			amount={parseInt(props.totalAmount * 100)}
			currency="EUR"
			locale="es"
		/>
	);
};

StripeButton.propTypes = {
	totalAmount: PropTypes.number
};
