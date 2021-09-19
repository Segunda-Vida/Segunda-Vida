import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import Axios from "axios";
import { Image } from "cloudinary-react";

export const Perfil = () => {
	return (
		<div>
			<Navbar />
			<h1>Hola</h1>
			<div className="modal" tabIndex="-1">
				<div Name="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Modal title</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<p>Modal body text goes here.</p>
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
	);
};
