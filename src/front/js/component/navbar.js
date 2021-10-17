import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	$("#myModal").modal("hide");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nickname, setNickname] = useState("");
	const [recover, setRecover] = useState(false);
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const [emailForgot, setEmailForgot] = useState("");

	console.log(store.cart);

	$("#staticBackdrop").on("hidden.bs.modal", function() {
		location.reload();
	});

	const hideSignIn = () => $("#exampleModal").modal("hide");

	const login = () => {
		hideSignIn();
		actions.login(email, password);
		setEmail("");
		setPassword("");
	};

	const register = () => {
		actions.register(nickname, email, password);
		setNickname("");
		setEmail("");
		setPassword("");
	};

	const forgotPassword = () => {
		actions.forgotPassword(emailForgot);
		setEmailForgot("");
		setShowForgotPassword(!showForgotPassword);
	};

	const [text, setText] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		actions.buscador();
	}, []);

	const onChangeHandler = text => {
		let matches = [];
		if (text.length > 0) {
			matches = store.products.filter(product => {
				const regex = new RegExp(`${text}`, "gi");
				return product.name.match(regex);
			});
		}
		setSuggestions(matches);
		setText(text);
	};

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
			<nav className="navbar navbar-expand-lg navbar-light bg-light nav" id="navbar">
				<Link to="/">
					<button
						className="btn btn-outline-primary my-2 my-sm0"
						type="submit"
						href="#"
						style={{ marginRight: "5px" }}>
						<p id="Titulo4" style={{ margin: "1px" }}>
							Segunda Vida
						</p>
					</button>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<form className="form-inline my-2 my-lg-0 ">
						<div>
							<input
								type="text"
								className="col-md-12 input   rounded form-control input-lg"
								onChange={e => onChangeHandler(e.target.value)}
								value={text}
							/>
						</div>
						{suggestions &&
							suggestions.map((suggestion, i) => (
								<Link key={i} to="/productDetail/:id?">
									<div className="suggestion col-md-12 justify-content-md-center">
										{suggestion.name}
									</div>
								</Link>
							))}
					</form>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item active" id="li1">
							{store.isAuthenticate ? (
								<div>
									<button
										type="button"
										className="btn  btn-outline-primary my-2 my-sm0"
										data-toggle="modal"
										data-target="#staticBackdrop"
										style={{ margin: "5px" }}>
										<i className="fas fa-file-import"> Subir Productos</i>
									</button>

									<Link to="/devolucion">
										<button
											className="btn btn-outline-primary my-2 my-sm0"
											type="submit"
											href="#"
											style={{ marginRight: "5px" }}>
											<i className="fas fa-hand-holding-usd">Devoluciones</i>
											<span> ({store.devolutionProd.length})</span>
										</button>
									</Link>

									<Link to="/">
										<button
											className="btn btn-outline-primary my-2 my-sm0"
											type="submit"
											onClick={() => actions.signOut()}>
											<i className="fas fa-sign-out-alt"> Cerrar sesión</i>
										</button>
									</Link>
								</div>
							) : (
								<div>
									<button
										onClick={() => hideSignIn()}
										className="btn btn-outline-primary my-2 my-sm-0"
										type="submit"
										data-toggle="modal"
										data-target="#exampleModal"
										style={{ margin: "5px" }}>
										<i className="fas fa-sign-in-alt"> Regístrate o inicia sesión</i>
									</button>
									<button
										type="button"
										className="btn  btn-outline-primary my-2 my-sm0"
										data-toggle="modal"
										data-target="#exampleModal"
										style={{ margin: "5px" }}>
										<i className="fas fa-file-import"> Subir Productos</i>
									</button>
									<div
										className="modal fade"
										id="exampleModal"
										tabIndex="-1"
										role="dialog"
										aria-labelledby="exampleModalLabel"
										aria-hidden="true">
										<div className="modal-dialog" role="document">
											<div className="modal-content" style={{ width: "600px" }}>
												<div className="modal-header">
													<h5 className="modal-title" id="exampleModalLabel">
														Bienvenidos a Segunda Vida
													</h5>
													<button
														type="button"
														className="close "
														data-dismiss="modal"
														aria-label="Close">
														<i className="fas fa-sign-out-alt"></i>
													</button>
												</div>
												<div className="modal-body" style={{ textAlign: "center" }}>
													<h4>Inicia sesión</h4>
												</div>

												<div className="text-center mt-5">
													<div style={{ display: "flex" }}>
														<input
															className="form-control"
															type="email"
															placeholder="Ingresar correo electronico"
															value={email}
															style={{ width: "250px", margin: "10px" }}
															onChange={e => setEmail(e.target.value)}
														/>
														<input
															className="form-control"
															type="password"
															placeholder="Ingresar contraseña"
															value={password}
															style={{ width: "200px", margin: "10px" }}
															onChange={e => setPassword(e.target.value)}
														/>
														<button
															className="btn btn-outline-primary my-2 my-sm-0"
															style={{ margin: "10px" }}>
															<i onClick={() => login()} className="fas fa-sign-in-alt">
																{" "}
																Entrar
															</i>
														</button>
													</div>
												</div>

												<div
													className="modal-footer"
													style={{ display: "block", textAlign: "center" }}>
													<div style={{ margin: "10px" }}>
														<button
															onClick={() => hideSignIn()}
															type="submit"
															name="submitSave"
															className="btn btn-outline-primary my-2 my-sm-0"
															data-toggle="modal"
															data-target="#myModal2">
															<i className="fas fa-address-book"> Regístrate</i>
														</button>
													</div>
													<div style={{ margin: "10px" }}>
														<button
															onClick={() => hideSignIn()}
															type="submit"
															name="submitSave"
															className="btn btn-outline-primary my-2 my-sm-0"
															data-toggle="modal"
															data-target="#myModal3"
															style={{ margin: "20px" }}>
															<i className="fas fa-key"> Recuperar contraseña</i>
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</li>
					</ul>
				</div>
			</nav>
			<div>
				<div
					className="modal fade"
					id="myModal2"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">Registrarse</h4>
								<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
									<i className="fas fa-sign-out-alt"></i>
								</button>
							</div>
							<div className="container"></div>
							<div className="modal-body">
								Con un simple Nickname, email y contraseña podrás completar tu registro.
							</div>
							<div className="modal-footer">
								<input
									className="form-control"
									type="nickname"
									placeholder="Ingresar nickname"
									value={nickname}
									onChange={e => setNickname(e.target.value)}
								/>

								<input
									className="form-control"
									type="email"
									placeholder="Ingresar correo electronico"
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
								<input
									className="form-control"
									type="password"
									placeholder="Ingresar contraseña"
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
								<div style={{ justifyContent: "center" }}>
									<button
										className="btn btn-outline-primary my-2 my-sm-0"
										data-dismiss="modal"
										aria-hidden="true"
										type="submit"
										onClick={() => register()}>
										¡Comienza ya!
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="modal" id="myModal3" data-backdrop="static">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Recuperar contraseña</h4>
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
								<i className="fas fa-sign-out-alt"></i>
							</button>
						</div>
						<div className="container"></div>
						<div className="modal-body">Introduce tu mail para recuperación de contraseña</div>
						<div className="modal-footer">
							<input
								className="form-control"
								type="email"
								placeholder="Ingresar correo electronico"
								value={emailForgot}
								onChange={e => setEmailForgot(e.target.value)}
							/>
							<button
								className="btn btn-outline-primary my-2 my-sm-0"
								data-dismiss="modal"
								aria-hidden="true"
								type="submit"
								onClick={() => forgotPassword()}>
								Recuperar contraseña
							</button>
							<p
								style={{ cursor: "pointer" }}
								onClick={() => setShowForgotPassword(!showForgotPassword)}></p>
						</div>
					</div>
				</div>
			</div>
			<div
				className="modal fade"
				id="staticBackdrop"
				data-backdrop="false"
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
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
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

								<button
									className="btn btn-outline-primary my-2 my-sm-0"
									type="submit"
									onClick={() => pushProduct()}>
									Subir
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
