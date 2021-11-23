import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import Toastr from "toastr2";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	$("#myModal").modal("hide");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nickname, setNickname] = useState("");
	const [filo, setFilo] = useState();
	const [country, setCountry] = useState("");
	const [countries, setCountries] = useState([]);
	const [recover, setRecover] = useState(false);
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const [emailForgot, setEmailForgot] = useState("");
	const toastr = new Toastr();

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
		const formData = new FormData();
		formData.append("nickname", nickname);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("File", filo);
		formData.append("country", country);
		actions.register(formData);
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

	useEffect(() => {
		toastr.success(store.message, "", {
			timeOut: 2000,
			closeButton: true,
			progressBar: true,
			preventDuplicates: true
		});
	}, [store.product_loaded]);

	useEffect(() => {
		toastr.error(store.message, "", {
			timeOut: 2000,
			closeButton: true,
			progressBar: true,
			preventDuplicates: true
		});
	}, [store.product_loaded_error]);

	useEffect(() => {
		fetch("https://countriesnow.space/api/v0.1/countries")
			.then(resp => {
				if (resp.ok) {
					return resp.json();
				}
			})
			.then(data => {
				console.log(data);
				setCountries(data.data);
			})
			.catch(error => console.error("[ERROR GET COUNTRIES]", error));
	}, []);

	const onChangeHandler = text => {
		let matches = [];
		if (text.length > 0) {
			matches =
				!!store.products &&
				store.products.filter(product => {
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
			toastr.warning("Solo puedes subir 3 imágenes", "Subida de archivos", {
				timeOut: 2000,
				closeButton: true,
				progressBar: true,
				preventDuplicates: true
			});
		} else {
			setFile(event.target.files);
			setSelected(true);
		}
	};

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light nav" id="navbar">
				<div className="Header">
					<Link to="/home">
						<img
							className="img-logo"
							src="https://ci6.googleusercontent.com/proxy/f58kg40ctZ-DjhiD6L9M9vEpMSPGkplGEqNHtYRsfVq_6h6l-DjWCLl8TnIbby73psRpjEHcNTu6_70ATCRiqT3BPAqvUv5aJEYg4-sFQ1Tcu_3lpaTb_pMAMmci9apZMibcvAXe5fZ3t2Wk4_RaEFg0eQ=s0-d-e1-ft#https://api.freelogodesign.org/files/287dfdcf9dcb476399e52fabe7cd0308/thumb/logo_200x200.png?v=0"
						/>
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
									placeholder="Buscar un producto"
									className="col-md-12 input   rounded form-control input-lg"
									onChange={e => onChangeHandler(e.target.value)}
									value={text}
									style={{ width: "700px", marginLeft: "10px" }}
								/>
							</div>
							<ul id="myResults">
								{suggestions &&
									suggestions.map((suggestion, i) => (
										<li
											key={i}
											className="suggestion col-md-12 justify-content-md-center"
											style={{ color: "white" }}>
											<Link to={`/productDetail/${suggestion.id}`}>{suggestion.name}</Link>
										</li>
									))}
							</ul>
						</form>
						<ul className="navbar-nav ml-auto">
							<li className="nav-item active" id="li1">
								{store.isAuthenticate ? (
									<div>
										<button
											type="button"
											className="btn btn-logout"
											data-toggle="modal"
											data-target="#staticBackdrop">
											<i className="fas fa-file-import">
												<p id="p2">Subir Productos</p>
											</i>
										</button>

										<Link to="/home">
											<button
												className="btn btn-logout"
												type="submit"
												style={{ margin: "10px" }}
												onClick={() => actions.signOut()}>
												<i className="fas fa-sign-out-alt">
													{" "}
													<p id="p2">Cerrar sesión</p>
												</i>
											</button>
										</Link>
									</div>
								) : (
									<div>
										<button
											onClick={() => hideSignIn()}
											className="btn btn-logout"
											type="submit"
											data-toggle="modal"
											data-target="#exampleModal"
											style={{ margin: "10px" }}>
											<i className="fas fa-sign-in-alt">
												{" "}
												<p id="p2">Regístrate o inicia sesión</p>
											</i>
										</button>
										<button
											type="button"
											className="btn btn-logout"
											data-toggle="modal"
											data-target="#exampleModal"
											style={{ margin: "10px" }}>
											<i className="fas fa-file-import">
												<p id="p2">Subir Productos</p>
											</i>
										</button>
									</div>
								)}
							</li>
						</ul>
					</div>
				</div>
				{store.isAuthenticate ? (
					<div>
						<div className="Carrito text-center">
							<Link to="/Perfil">
								<i className="fas fa-users jrl">
									<p id="p2"> Perfil</p>
								</i>
							</Link>
							<Link to="/cart">
								<i className="fas fa-shopping-cart jrl">
									<p id="p2"> Carrito</p>
								</i>
								<span className="jrl3">({store.cart.length})</span>
							</Link>
							<Link to={`/productProfile`}>
								<i className="fas fa-box-open jrl">
									<p id="p2">Tus Productos</p>
								</i>
							</Link>
							<Link to="/devolucion">
								<i className="fas fa-hand-holding-usd jrl">
									<p id="p2">Devoluciones</p>
								</i>
								<span className="jrl3"> ({store.devolutionProd.length})</span>
							</Link>
						</div>
						<div className="Categorías text-center">
							<div className="dropdown">
								<button
									className="btn btn-logout jrl dropdown-toggle"
									type="button"
									id="dropdownMenuButton"
									data-toggle="dropdown"
									aria-expanded="false">
									Menu
								</button>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<div style={{ display: "flex", zIndex: "10" }}>
										<a className="dropdown-item" href="#">
											Todas las categorías
										</a>
										<a className="dropdown-item" href="#">
											Moda y accesorios
										</a>
										<a className="dropdown-item" href="#">
											Electrodomésticos
										</a>
										<a className="dropdown-item" href="#">
											Tv, audio y foto
										</a>
										<a className="dropdown-item" href="#">
											Motor
										</a>
										<a className="dropdown-item" href="#">
											Móviles y tecnología
										</a>

										<a className="dropdown-item" href="#">
											Hogar y jardín
										</a>

										<a className="dropdown-item" href="#">
											Otros
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : null}
				<div className="nav-panel_row"></div>
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
								<select
									className="form-control"
									aria-label="Default select example"
									value={country}
									onChange={e => setCountry(e.target.value)}>
									{countries.length > 0 &&
										countries.map((item, key) => (
											<option key={key} value={item.country}>
												{item.country}
											</option>
										))}
								</select>
								<input
									className="form-control"
									type="file"
									name="file"
									onChange={e => setFilo(e.target.files[0])}
								/>
								<div style={{ justifyContent: "center" }}>
									<button
										className="btn btn-navmain2"
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
								className="btn btn-navmain2"
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

								<button className="btn btn-navmain2" type="submit" onClick={() => pushProduct()}>
									Subir
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Bienvenidos a Segunda Vida
							</h5>
							<button
								type="button"
								className="close "
								data-dismiss="modal"
								aria-label="Close"
								data-backdrop="false">
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
								<button className="btn btn-navmain2">
									<i onClick={() => login()} className="fas fa-sign-in-alt">
										{" "}
										Entrar
									</i>
								</button>
							</div>
						</div>

						<div className="modal-footer" style={{ display: "block", textAlign: "center" }}>
							<div style={{ margin: "10px" }}>
								<button
									onClick={() => hideSignIn()}
									type="submit"
									name="submitSave"
									className="btn btn-navmain2"
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
									className="btn btn-navmain2"
									data-toggle="modal"
									data-target="#myModal3">
									<i className="fas fa-key"> Recuperar contraseña</i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
