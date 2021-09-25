import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Axios from "axios";
import { Image } from "cloudinary-react";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";

export const SubirProductos = () => {
	const { store, actions } = useContext(Context);
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

	const uploadFile = () => {};

	const [imageSelected, setImageSelected] = useState("");

	const uploadImage = files => {
		const formData = new FormData();
		formData.append("file", imageSelected);
		formData.append("upload_preset", "hgachud7");

		Axios.post("https://api.cloudinary.com/v1_1/dguclmq6v/image/upload", formData).then(resp => {
			console.log("resp", resp);
		});
	};
	return (
		<div>
			<Navbar />
			<div className="row">
				<div style={{ margin: "10px" }}>
					<button
						type="button"
						className="btn  btn-outline-success my-2 my-sm0"
						data-toggle="modal"
						data-target="#staticBackdrop">
						<i className="fas fa-bath"> Electrodomesticos</i>
					</button>
					<h1></h1>
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
										Modal title
									</h5>
									<button type="button" className="close " data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<input
										type="text"
										placeholder="nombre del producto"
										value={name}
										onChange={e => setName(e.target.value)}
									/>

									<input
										type="number"
										placeholder="precio del producto"
										value={price}
										onChange={e => setPrice(e.target.value)}
									/>

									<input
										type="text"
										placeholder="el brand del producto"
										value={brand}
										onChange={e => setBrand(e.target.value)}
									/>

									<input
										type="text"
										placeholder="description del producto"
										value={description}
										onChange={e => setDescription(e.target.value)}
									/>
									<input
										type="file"
										onChange={e => {
											changeFile(e);
										}}
										multiple
									/>

									<button type="submit" onClick={() => pushProduct()}>
										Subir
									</button>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">
										Close
									</button>
									<button type="button" className="btn btn-primary">
										Save changes
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style={{ margin: "10px" }}>
					<button
						type="button"
						className="btn  btn-outline-success my-2 my-sm0"
						data-toggle="modal"
						data-target="#myModal4">
						<i className="fas fa-gem"> Joyería</i>
					</button>

					<div
						className="modal fade"
						id="myModal4"
						tabIndex="-1"
						role="dialog"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">
										Modal title
									</h5>
									<button type="button" className="close " data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<input
										type="text"
										placeholder="nombre del producto"
										value={name}
										onChange={e => setName(e.target.value)}
									/>

									<input
										type="number"
										placeholder="precio del producto"
										value={price}
										onChange={e => setPrice(e.target.value)}
									/>

									<input
										type="text"
										placeholder="el brand del producto"
										value={brand}
										onChange={e => setBrand(e.target.value)}
									/>

									<input
										type="text"
										placeholder="description del producto"
										value={description}
										onChange={e => setDescription(e.target.value)}
									/>
									<button type="submit" onClick={() => pushProduct()}>
										Subir
									</button>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">
										Close
									</button>
									<button type="button" className="btn btn-primary">
										Save changes
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style={{ margin: "10px" }}>
					<button
						type="button"
						className="btn  btn-outline-success my-2 my-sm0"
						data-toggle="modal"
						data-target="#myModal4">
						<i className="fas fa-car"> Coches y motos</i>
					</button>

					<div
						className="modal fade"
						id="myModal4"
						tabIndex="-1"
						role="dialog"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">
										Modal title
									</h5>
									<button type="button" className="close " data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<input
										type="text"
										placeholder="nombre del producto"
										value={name}
										onChange={e => setName(e.target.value)}
									/>

									<input
										type="number"
										placeholder="precio del producto"
										value={price}
										onChange={e => setPrice(e.target.value)}
									/>

									<input
										type="text"
										placeholder="el brand del producto"
										value={brand}
										onChange={e => setBrand(e.target.value)}
									/>

									<input
										type="text"
										placeholder="description del producto"
										value={description}
										onChange={e => setDescription(e.target.value)}
									/>
									<button type="submit" onClick={() => pushProduct()}>
										Subir
									</button>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">
										Close
									</button>
									<button type="button" className="btn btn-primary">
										Save changes
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<Link to="/ProductDetail/1">
					<button>Entrar</button>
				</Link>
			</div>
		</div>
	);
};
