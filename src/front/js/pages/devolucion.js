import React, { useState, useContext, useEffect } from "react";
import { Navbar } from "../component/navbar.js";
import { Context } from "../store/appContext";
import { StripeButton2 } from "../component/StripeButton2";
import { Sidebar } from "../component/sidebar.js";

export const Devolucion = () => {
	const { store, actions } = useContext(Context);

	const [productSelected, setProductSelected] = useState([]);
	const [devol, setDevol] = useState(0);

	const addProductDevolution = item => {
		console.log("entre a addproductdevolution");
		if (!productSelected.includes(item)) {
			console.log("entre a agregar producto");
			setProductSelected(oldProducts => [...oldProducts, item]);
		}
	};

	useEffect(() => {
		actions.getUserNick();
	}, []);

	const removeDev = item => {
		if (productSelected.includes(item)) {
			setProductSelected(productSelected.filter(itemOr => itemOr.id !== item.id));
		}
	};

	useEffect(() => {
		let calc = productSelected.reduce((acc, cur) => acc + 1 * cur.price * 1.21 * -1, 0);
		setDevol(calc);
	}, [productSelected]);

	return (
		<div>
			<Navbar />

			<div className="container">
				<div
					className="table"
					style={{
						border: "1px solid rgb(96, 96, 248)",
						display: "table",
						marginTop: "150px",
						marginLeft: "20px",
						marginRight: "20px"
					}}>
					<div className="theader" style={{ display: "table-header-group" }}>
						<div className="tr" style={{ display: "table-row" }}>
							<div className="th" style={{ display: "table-cell" }}>
								<p id="p1">Imagen</p>
							</div>
							<div className="th" style={{ display: "table-cell" }}>
								<p id="p1">Producto</p>
							</div>
							<div className="th" style={{ display: "table-cell" }}>
								<p id="p1">Precio</p>
							</div>
							<div className="th" style={{ display: "table-cell" }}></div>
							<div className="th" style={{ display: "table-cell" }}></div>
						</div>
					</div>

					<div className="tbody" style={{ display: "table-row-group" }}>
						{store.devolutionProd.map((item, key) => (
							<div
								className="tr"
								style={{ display: "table-row", cursor: "pointer" }}
								key={key}
								onClick={() => addProductDevolution(item)}>
								<div className="td" style={{ display: "table-cell" }}>
									<img src={item.product_image_url[0]} style={{ height: "50px", width: "50px" }} />
								</div>
								<div className="td" style={{ display: "table-cell" }}>
									<p id="p1">{item.name}</p>
								</div>
								<div className="td" style={{ display: "table-cell" }}>
									<p id="p1">{item.price}</p>
								</div>
								{productSelected.length > 0 && productSelected.includes(item) ? (
									<div className="td" style={{ display: "table-cell" }}>
										<p style={{ color: "white" }}>✓</p>
									</div>
								) : null}
								{productSelected.length > 0 && productSelected.includes(item) ? (
									<div
										className="td"
										style={{ display: "table-cell" }}
										onClick={() => removeDev(item)}>
										<p style={{ color: "red" }}>X</p>
									</div>
								) : null}
								<div className="td" style={{ display: "table-cell" }}></div>
							</div>
						))}
					</div>
					<div className="tfooter" style={{ display: "table-footer-group", justifyContent: "center" }}>
						<div className="tr" style={{ display: "table-row" }}>
							<div className="td" style={{ display: "table-cell" }}></div>
							<div className="td" style={{ display: "table-cell" }}></div>
							{store.devolutionProd.length > 0 ? (
								<>
									<div className="td" style={{ display: "table-cell" }}>
										<p id="p1">Total con Iva: {devol}€</p>
									</div>

									<div className="td" style={{ display: "table-cell" }}>
										<StripeButton2
											totalAmount={devol}
											product_id={productSelected.length > 0 ? productSelected : []}
										/>
									</div>
								</>
							) : null}
						</div>
					</div>
				</div>
				<div
					className="table text-center"
					style={{
						border: "1px solid rgb(96, 96, 248)",
						display: "table",
						marginTop: "50px"
					}}>
					<div>
						<h2 id="Titulo">DIRECCIÓN DEVOLUCIONES</h2>
					</div>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<p id="p1" style={{ color: "white", margin: "5px" }}>
							{" "}
							Dirección : {store.user_nick.direction}
						</p>
						<p id="p1" style={{ color: "white", margin: "5px" }}>
							{" "}
							{store.user_nick.postal_code}
						</p>
						<p id="p1" style={{ color: "white", margin: "5px" }}>
							{" "}
							{store.user_nick.poblation}, {store.user_nick.provence}
						</p>
						<p id="p1" style={{ color: "white", margin: "5px" }}>
							({store.user_nick.country})
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
