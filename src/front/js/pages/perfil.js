import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import Axios from "axios";
import { Image } from "cloudinary-react";

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
			<h1>Hola</h1>
			<h2>Esta es my zona personal</h2>
			<div className="text-center mt-5">
				<input type="file" name="file" onChange={e => changeFile(e)} />
				<div>
					<button onClick={() => uploadFile()}>Subir</button>
				</div>
			</div>
			<div>
				<input
					type="file"
					onChange={e => {
						setImageSelected(e.target.files[0]);
					}}
				/>
				<button onClick={uploadImage}>Upload Image</button>
				<Image
					cloudName="dguclmq6v"
					publicId="https://res.cloudinary.com/dguclmq6v/image/upload/v1632050531/slaeej02xouj1gga5a61.jpg"
				/>
				<Image
					cloudName="dguclmq6v"
					publicId="https://res.cloudinary.com/dguclmq6v/image/upload/v1632050972/alqbld47suxdeidb3i5y.jpg"
				/>
			</div>
		</div>
	);
};
