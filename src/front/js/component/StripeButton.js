import React, { useEffect, useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import PropTypes, { element } from "prop-types";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import Toastr from "toastr2";
export const StripeButton = props => {
	const { store, actions } = useContext(Context);

	let history = useHistory();
	const toastr = new Toastr();

	const getToken = token => {
		console.log("pago", token);
		if (token) {
			actions.devProd();
			actions.deleteCart();
			actions.getPrAll();
			history.push("/home");
			toastr.success("Tu compra se ha realizado correctamente", "Compra Finalizada", {
				timeOut: 2000,
				closeButton: true,
				progressBar: true,
				preventDuplicates: true
			});
		} else {
			toastr.error("No se ha podido realizar tu compra", "Error al comprar", {
				timeOut: 2000,
				closeButton: true,
				progressBar: true,
				preventDuplicates: true
			});
		}
	};

	return (
		<StripeCheckout
			label="Pagar ahora"
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

StripeButton.propTypes = {
	totalAmount: PropTypes.number
};
