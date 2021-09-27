import React from "react";
import StripeCheckout from "react-stripe-checkout";
import PropTypes from "prop-types";

const StripeButton = props => {
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
			amount={props.totalAmount}
		/>
	);
};

StripeButton.propTypes = {
	totalAmount: PropTypes.number
};

export default StripeButton;
