import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<a className="navbar-brand" href="#">
				Navbar
			</a>
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
									<form action="index.php" method="post">
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
											<h4>Bienvenido a la ventana modal Boostrap 4</h4>
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">Email</label>
												<input
													type="email"
													className="form-control"
													name="email"
													placeholder="Escribe tu email..."
												/>
												<small id="emailHelp" className="form-text text-muted">
													Escribe tu email. Esto es un ejemplo. Tu email no queda registrado
													en ningun lugar.
												</small>
											</div>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-secondary" data-dismiss="modal">
												Cerrar
											</button>
											<button type="submit" name="submitSave" className="btn btn-primary">
												Guardar cambios
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div className="ml-auto">
							{store.isAuthenticate ? (
								<button onClick={() => actions.signOut()}>Cerrar sesión</button>
							) : (
								<p>Iniciar sesión</p>
							)}
						</div>
					</li>
				</ul>
				<form className="form-inline my-2 my-lg-0">
					<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
					<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
						Search
					</button>
				</form>
			</div>
		</nav>
	);
};
