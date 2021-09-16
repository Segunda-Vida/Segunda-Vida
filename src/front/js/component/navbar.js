import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	$("#exampleModal").modal("hide");
	$("#myModal").modal("hide");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nickname, setNickname] = useState("");
	const [recover, setRecover] = useState(false);

	const login = () => {
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

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link to="/Home">
					<button className="btn btn-outline-success my-2 my-sm0" type="submit" href="#">
						Segunda Vida
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
					<form className="form-inline my-2 my-lg-0">
						<input
							className="form-control mr-sm-2"
							type="search"
							placeholder="Search"
							aria-label="Busca tu producto"
						/>
						<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
							<i className="fas fa-search"></i>
						</button>
					</form>
					<ul className="navbar-nav">
						<li className="nav-item active">
							<a className="nav-link" href="#">
								<button className="btn btn-outline-success my-2 my-sm0" type="submit">
									<i className="fas fa-home"></i>
								</button>
							</a>
						</li>
						<li className="nav-item active" id="li1">
							{store.isAuthenticate ? (
								<div>
									<Link to="/Home">
										<button
											className="btn btn-outline-success my-2 my-sm0"
											type="submit"
											onClick={() => actions.signOut()}>
											Cerrar sesión
										</button>
									</Link>
								</div>
							) : (
								<div>
									<button
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
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title" id="exampleModalLabel">
														Hola
													</h5>
													<button
														type="button"
														className="close"
														data-dismiss="modal"
														aria-label="Close">
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
												<div className="modal-body">
													<h4>Login</h4>
												</div>

												<div className="text-center mt-5">
													{store.isAuthenticate ? (
														<div>
															<button onClick={() => actions.signOut()}>
																Cerrar sesión
															</button>
														</div>
													) : (
														<>
															<input
																type="email"
																placeholder="Ingresar correo electronico"
																value={email}
																onChange={e => setEmail(e.target.value)}
															/>
															<input
																type="password"
																placeholder="Ingresar contraseña"
																value={password}
																onChange={e => setPassword(e.target.value)}
															/>
															<Link to="/Perfil">
																<button
																	className="btn btn-outline-success my-2 my-sm-0"
																	onClick={() => login()}>
																	Entrar
																</button>
															</Link>
														</>
													)}
												</div>

												<div className="modal-footer">
													<div>
														<button
															type="submit"
															name="submitSave"
															className="btn btn-outline-success my-2 my-sm-0"
															data-toggle="modal"
															data-target="#myModal2">
															Registrar
														</button>

														<button
															type="submit"
															name="submitSave"
															className="btn btn-outline-success my-2 my-sm-0"
															data-toggle="modal"
															data-target="#myModal3">
															Recuperar contraseña
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
									×
								</button>
							</div>
							<div className="container"></div>
							<div className="modal-body">
								Con un simple Nickname, email y contraseña podrás completar tu registro.
							</div>
							<div className="modal-footer">
								<input
									type="nickname"
									placeholder="Ingresar nickname"
									value={nickname}
									onChange={e => setNickname(e.target.value)}
								/>

								<input
									type="email"
									placeholder="Ingresar correo electronico"
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
								<input
									type="password"
									placeholder="Ingresar contraseña"
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
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

			<div className="modal" id="myModal3" data-backdrop="static">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">3nd Modal title</h4>
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
								×
							</button>
						</div>
						<div className="container"></div>
						<div className="modal-body">goes here.</div>
						<div className="modal-footer">
							<a href="#" data-dismiss="modal" className="btn">
								Close
							</a>
							<a href="#" className="btn btn-primary">
								Save changes
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
