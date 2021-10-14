import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

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

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light nav">
				<Link to="/Home">
					<button
						className="btn btn-outline-success my-2 my-sm0 text-dark"
						type="submit"
						href="#"
						style={{ marginRight: "5px" }}>
						<i className="fas fa-home"> Segunda Vida</i>
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
									<Link to="/cart">
										<button
											className="btn btn-outline-success my-2 my-sm0"
											type="submit"
											href="#"
											style={{ marginRight: "5px" }}>
											<i className="fas fa-shopping-cart"> Carrito</i>
											<span> ({store.cart.length})</span>
										</button>
									</Link>

									<Link to="/devolucion">
										<button
											className="btn btn-outline-success my-2 my-sm0"
											type="submit"
											href="#"
											style={{ marginRight: "5px" }}>
											<i className="fas fa-hand-holding-usd">Devoluciones</i>
											<span> ({store.devolutionProd.length})</span>
										</button>
									</Link>

									<Link to="/Perfil">
										<button
											className="btn btn-outline-success my-2 my-sm0"
											type="submit"
											href="#"
											style={{ marginRight: "5px" }}>
											<i className="fas fa-users"> Perfil</i>
										</button>
									</Link>
									<Link to="/Home">
										<button
											className="btn btn-outline-success my-2 my-sm0"
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
										className="btn btn-outline-success my-2 my-sm-0"
										type="submit"
										data-toggle="modal"
										data-target="#exampleModal">
										<i className="fas fa-sign-in-alt"> Iniciar sesión</i>
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
													<h4>Login</h4>
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
															className="btn btn-outline-success my-2 my-sm-0"
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
															className="btn btn-outline-success my-2 my-sm-0"
															data-toggle="modal"
															data-target="#myModal2">
															<i className="fas fa-address-book"> Registrar</i>
														</button>
													</div>
													<div style={{ margin: "10px" }}>
														<button
															onClick={() => hideSignIn()}
															type="submit"
															name="submitSave"
															className="btn btn-outline-success my-2 my-sm-0"
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
										className="btn btn-outline-success my-2 my-sm-0"
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
								className="btn btn-outline-success my-2 my-sm-0"
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
		</div>
	);
};
