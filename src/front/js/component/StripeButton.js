import React, { useEffect, useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import PropTypes, { element } from "prop-types";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const StripeButton = props => {
	const { store, actions } = useContext(Context);

	let history = useHistory();

	const getToken = token => {
		console.log("pago", token);
		if (token) {
			actions.devProd();
			actions.deleteCart();
			history.push("/home");
			alert("Tu compra se ha realizado correctamente");
		} else {
			console.log("No se ha podido realizar tu compra");
		}
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
