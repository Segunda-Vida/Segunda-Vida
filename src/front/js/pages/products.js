import React from "react";
import { useParams } from "react-router-dom";

const Products = () => {
	let { text } = useParams();

	return (
		<div>
			<h1>{text}</h1>
		</div>
	);
};

export default Products;
