import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Axios from "axios";
import { Image } from "cloudinary-react";
import { Navbar } from "../component/navbar";

export const SubirProductos = () => {
	const { store, actions } = useContext(Context);

	const [file, setFile] = useState("");
	const [selected, setSelected] = useState(false);

	const changeFile = event => {
		setFile(event.target.files[0]);
		setSelected(true);
	};

	const uploadFile = () => {
		const formData = new FormData();

		formData.append("File", file);

		actions.uploadFile(formData);
	};

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
			<div>
				<button
					type="button"
					className="btn  btn-outline-success my-2 my-sm0"
					data-toggle="modal"
					data-target="#exampleModal">
					Electrodomesticos
				</button>

				<div
					className="modal fade"
					id="exampleModal"
					tabIndex="-1"
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
								<input type="text" placeholder="nombre del producto" />
								<button>Anadir nombre</button>
								<input type="number" placeholder="precio del producto" />
								<button>Precio</button>

								<input type="text" placeholder="description del producto" />
								<button>Anadir description</button>
								<input type="file" />
								<button>Anair imagen</button>
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
			<div>
				<h1>Electrodomesticos</h1>
				<div className="card-deck">
					<div className="card">
						<div>
							<input
								type="file"
								onChange={e => {
									setImageSelected(e.target.files[0]);
								}}
							/>
							<button
								className="btn btn-outline-success my-2 my-sm0"
								type="submit"
								href="#"
								onClick={uploadImage}>
								Upload Image
							</button>
						</div>
						<Image
							cloudName="dguclmq6v"
							publicId="https://res.cloudinary.com/dguclmq6v/image/upload/v1632062372/gscm9epg7acifjg7ohzz.jpg"
						/>
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">
								This is a longer card with supporting text below as a natural lead-in to additional
								content. This content is a little bit longer.
							</p>
							<p className="card-text">
								<small className="text-muted">Last updated 3 mins ago</small>
							</p>
						</div>
					</div>

					<div className="card">
						<div>
							<input
								type="file"
								onChange={e => {
									setImageSelected(e.target.files[0]);
								}}
							/>
							<button
								className="btn btn-outline-success my-2 my-sm0"
								type="submit"
								href="#"
								onClick={uploadImage}>
								Upload Image
							</button>
						</div>
						<Image
							cloudName="dguclmq6v"
							publicId="https://res.cloudinary.com/dguclmq6v/image/upload/v1632062372/gscm9epg7acifjg7ohzz.jpg"
						/>

						<div className="card-body">
							<h5 className="card-title">Card title</h5>

							<p className="card-text">
								<small className="text-muted">Last updated 3 mins ago</small>
							</p>
						</div>
					</div>
					<div className="card">
						<img src="..." className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">
								This is a wider card with supporting text below as a natural lead-in to additional
								content. This card has even longer content than the first to show that equal height
								action.
							</p>
							<p className="card-text">
								<small className="text-muted">Last updated 3 mins ago</small>
							</p>
						</div>
					</div>
				</div>
			</div>
			<h1>Coches y motos</h1>
			<div className="card-deck">
				<div className="card">
					<div>
						<input
							type="file"
							onChange={e => {
								setImageSelected(e.target.files[0]);
							}}
						/>
						<button
							className="btn btn-outline-success my-2 my-sm0"
							type="submit"
							href="#"
							onClick={uploadImage}>
							Upload Image
						</button>
					</div>
					<Image
						cloudName="dguclmq6v"
						publicId="https://res.cloudinary.com/dguclmq6v/image/upload/v1632064037/vdhmz8jdtoy9ue0zo3is.jpg"
					/>
					<div className="card-body">
						<h5 className="card-title">Card title</h5>
						<p className="card-text">
							This is a longer card with supporting text below as a natural lead-in to additional content.
							This content is a little bit longer.
						</p>
						<p className="card-text">
							<small className="text-muted">Last updated 3 mins ago</small>
						</p>
					</div>
				</div>

				<div className="card">
					<div>
						<input
							type="file"
							onChange={e => {
								setImageSelected(e.target.files[0]);
							}}
						/>
						<button
							className="btn btn-outline-success my-2 my-sm0"
							type="submit"
							href="#"
							onClick={uploadImage}>
							Upload Image
						</button>
					</div>
					<Image
						cloudName="dguclmq6v"
						publicId="https://res.cloudinary.com/dguclmq6v/image/upload/v1632064037/vdhmz8jdtoy9ue0zo3is.jpg"
					/>

					<div className="card-body">
						<h5 className="card-title">Card title</h5>

						<p className="card-text">
							<small className="text-muted">Last updated 3 mins ago</small>
						</p>
					</div>
				</div>
				<div className="card">
					<img src="..." className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">Card title</h5>
						<p className="card-text">
							This is a wider card with supporting text below as a natural lead-in to additional content.
							This card has even longer content than the first to show that equal height action.
						</p>
						<p className="card-text">
							<small className="text-muted">Last updated 3 mins ago</small>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
