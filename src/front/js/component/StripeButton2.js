import React, { useEffect, useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import PropTypes, { element } from "prop-types";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const StripeButton2 = props => {
	const { store, actions } = useContext(Context);

	let history = useHistory();

	const getToken = token => {
		console.log("pago", token);
		if (token) {
			actions.devProd();
			actions.getPrAll();
			history.push("/home");
			alert("Tu devolución se ha realizado correctamente");
		} else {
			console.log("No se ha podido realizar tu devolución");
		}
	};

	return (
		<StripeCheckout
			label="Devolver dinero"
			name="Segunda Vida"
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

StripeButton2.propTypes = {
	totalAmount: PropTypes.number
};
