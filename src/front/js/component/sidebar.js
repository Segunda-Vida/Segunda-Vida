import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const Sidebar = () => {
	const { store, actions } = useContext(Context);
	const { user_id } = useParams();

	useEffect(() => {
		actions.getPrUser(user_id);
		actions.getPrAll();
	}, []);

	$("#myModa14").modal("hide");
	const hideSignIn = () => $("#exampleModal").modal("hide");

	const [file, setFile] = useState([]);
	const [selected, setSelected] = useState(false);

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [brand, setBrand] = useState("");
	const [description, setDescription] = useState("");

	const pushProduct = () => {
		const formData = new FormData();
		console.log(file);
		for (let i = 0; i < file.length; i++) {
			formData.append(`file-${i}`, file[i]);
		}

		formData.append("file_info", file.length);
		formData.append("name", name);
		formData.append("price", price);
		formData.append("brand", brand);
		formData.append("description", description);
		actions.pushProduct(formData);

		setBrand("");
		setName("");
		setPrice("");
		setDescription("");
	};

	const changeFile = event => {
		if (event.target.files.length > 3) {
			alert("Solo puedes subir 3 imágenes");
		} else {
			setFile(event.target.files);
			setSelected(true);
		}
	};

	return (
		<div>
			<div style={{ display: "block" }}>
				<div>
					<button
						type="button"
						className="btn  btn-outline-success my-2 my-sm0"
						data-toggle="modal"
						data-target="#staticBackdrop">
						<i className="fas fa-file-import"> Subir Productos</i>
					</button>
				</div>

				<div
					className="modal fade"
					id="staticBackdrop"
					data-backdrop="static"
					data-keyboard="false"
					tabIndex="-1"
					aria-labelledby="staticBackdropLabel"
					aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">
									Subir Productos
								</h5>
								<button type="button" className="close " data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<input
									className="form-control"
									type="text"
									placeholder="nombre del producto"
									value={name}
									style={{ marginBottom: "10px" }}
									onChange={e => setName(e.target.value)}
								/>

								<input
									className="form-control"
									type="number"
									placeholder="precio del producto"
									value={price}
									style={{ marginBottom: "10px" }}
									onChange={e => setPrice(e.target.value)}
								/>

								<input
									className="form-control"
									type="text"
									placeholder="el brand del producto"
									value={brand}
									style={{ marginBottom: "10px" }}
									onChange={e => setBrand(e.target.value)}
								/>

								<input
									className="form-control"
									type="text"
									placeholder="descripcion del producto"
									value={description}
									style={{ marginBottom: "10px" }}
									onChange={e => setDescription(e.target.value)}
								/>

								<div style={{ display: "flex" }}>
									<input
										className="form-control "
										type="file"
										style={{ marginBottom: "10px" }}
										onChange={e => {
											changeFile(e);
										}}
										multiple
									/>
									<h1
										className="btn btn-outline-success my-2 my-sm-0"
										type="submit"
										onClick={() => pushProduct()}>
										Subir
									</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="sidebar">
					<div style={{ display: "block" }}>
						<div>
							<button
								type="button"
								className="btn  btn-outline-success my-2 my-sm0"
								data-toggle="modal"
								data-target="#staticBackdrop">
								<i className="fas fa-file-import"> Subir Productos</i>
							</button>
						</div>

						<div
							className="modal fade"
							id="staticBackdrop"
							data-backdrop="static"
							data-keyboard="false"
							tabIndex="-1"
							aria-labelledby="staticBackdropLabel"
							aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											Subir Productos
										</h5>
										<button
											type="button"
											className="close "
											data-dismiss="modal"
											aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<input
											className="form-control"
											type="text"
											placeholder="nombre del producto"
											value={name}
											style={{ marginBottom: "10px" }}
											onChange={e => setName(e.target.value)}
										/>

										<input
											className="form-control"
											type="number"
											placeholder="precio del producto"
											value={price}
											style={{ marginBottom: "10px" }}
											onChange={e => setPrice(e.target.value)}
										/>

										<input
											className="form-control"
											type="text"
											placeholder="el brand del producto"
											value={brand}
											style={{ marginBottom: "10px" }}
											onChange={e => setBrand(e.target.value)}
										/>

										<input
											className="form-control"
											type="text"
											placeholder="descripcion del producto"
											value={description}
											style={{ marginBottom: "10px" }}
											onChange={e => setDescription(e.target.value)}
										/>

										<div style={{ display: "flex" }}>
											<input
												className="form-control "
												type="file"
												style={{ marginBottom: "10px" }}
												onChange={e => {
													changeFile(e);
												}}
												multiple
											/>
											<h1
												className="btn btn-outline-success my-2 my-sm-0"
												type="submit"
												onClick={() => pushProduct()}>
												Subir
											</h1>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="Carrito" style={{ margin: "5px" }}>
						<Link to="/cart">
							<i className="fas fa-shopping-cart" style={{ color: "rgb(96, 96, 248)" }}>
								{" "}
								Carrito
							</i>
							<span style={{ color: "rgb(96, 96, 248)" }}> ({store.cart.length})</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
