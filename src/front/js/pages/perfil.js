import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Image, Video, Transformation, CloudinaryContext } from "cloudinary-react";
import axios from "axios";

export const Perfil = () => {
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
		formData.append("upload_preset", "Prueba1");

		axios
			.post("https://api.cloudinary.com/v1_1/krlos160287/image/upload", formData)
			.then(resp => {
				console.log("respuesta", resp);
				if (resp.ok) {
					return resp.json();
				}
			})
			.then(data => {
				console.log("data", data);
			})
			.catch(error => console.log("[ERROR TO UPLOADO FILE]", error));
	};
	return (
		<div>
			<Navbar />
			<h1>Hola</h1>
			<h2>Esta es my zona personal</h2>
			<div className="text-center mt-5">
				<input type="file" name="file" onChange={e => changeFile(e)} />
				<div>
					<button onClick={() => uploadFile()}>Subir</button>
				</div>
			</div>
		</div>
	);
};
