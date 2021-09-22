import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import { Navbar } from "../component/navbar";

export const ProductDetail = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();

	useEffect(() => {
		actions.getProduct(id);
	}, []);
	return (
		<div>
			<Navbar />
			<h1>Nombre: {store.product.name}</h1>
		</div>
	);
};
