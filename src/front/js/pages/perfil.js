import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Perfil = () => {
	const { store, actions } = useContext(Context);

	const { user_id } = useParams();

	useEffect(() => {
		actions.getPrUser(user_id);
		actions.getPrAll();
	}, []);

	$("#myModal4").modal("hide");
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
		<div className="imgFondo">
			<Navbar />

			<div className="container" style={{ width: "100%" }}>
				<div className="row">
					<div className="col" style={{ textAlign: "center" }}>
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
					</div>

					<div className="col" style={{ marginTop: "10px", textAlign: "center" }}>
						<div>
							<Link to={`/productProfile`}>
								<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
									Tus Productos
								</button>
							</Link>
						</div>
						<div>
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUGS86E6j4Oaz7RO5xoPqA0rfnfibra5VLI7a6r8DUdAXq2MtdltWFk1O_mJSD8AEetYU&usqp=CAU"
								style={{ width: "100px", height: "200px", marginLeft: "1px", marginTop: "5px" }}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
