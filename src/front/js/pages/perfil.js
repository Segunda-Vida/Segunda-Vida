import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Perfil = () => {
	const [nickname, setNickname] = useState("");

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
							<div>
								<img
									src="data:image/jpeg;base64,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"
									style={{ width: "100px", height: "200px", marginLeft: "1px" }}
								/>
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
