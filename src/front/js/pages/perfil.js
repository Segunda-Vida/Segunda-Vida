import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";



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
