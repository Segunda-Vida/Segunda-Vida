import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = () => {
		actions.login(email, password);
		setEmail("");
		setPassword("");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link to="/Home">
				<a className="navbar-brand" href="#">
					Navbar
				</a>
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
					<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
					<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
						Search
					</button>
				</form>
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<a className="nav-link" href="#">
							Home <span className="sr-only">(current)</span>
						</a>
					</li>
					<li>
						<div className="container"></div>
						<button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
							Iniciar sesión
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
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<h4>Login</h4>
									</div>

									<div className="text-center mt-5">
										{store.isAuthenticate ? (
											<div>
												<button onClick={() => actions.signOut()}>Cerrar sesión</button>
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
													<button onClick={() => login()}>Entrar</button>
												</Link>
											</>
										)}
									</div>

									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-dismiss="modal">
											Cerrar
										</button>
										<button type="submit" name="submitSave" className="btn btn-primary">
											Guardar cambios
										</button>
										<div>
											<input type="email" placeholder="Ingresar correo electronico" />
											<input type="password" placeholder="Ingresar contrasena" />
											<button type="submit" name="submitSave" className="btn btn-primary">
												Registrar
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li>
						<Link to="/Home">
							<div className="ml-auto">
								{store.isAuthenticate ? (
									<button onClick={() => actions.signOut()}>Cerrar sesión</button>
								) : (
									<p></p>
								)}
							</div>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};
