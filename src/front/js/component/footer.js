import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer
		className="footer mt-auto py-3 text-center"
		style={{
			position: "fixed",
			height: "100px",
			width: "100%",
			bottom: "0",
			marginLeft: "10px"
		}}>
		<div style={{ display: "flex" }}>
			<div className="container-fluid" style={{ display: "flex", fontSize: "25px", justifyContent: "right" }}>
				<div style={{ display: "flex" }}>
					<div style={{ margin: "10px" }}>
						<a className="afooter" href="http://www.apple.com">
							<i className="fab fa-apple"></i>
						</a>
					</div>
					<div style={{ margin: "10px", textDecoration: "none" }}>
						<a className="afooter" href="http://www.facebook.com">
							<i className="fab fa-facebook"></i>
						</a>
					</div>
					<div style={{ margin: "10px" }}>
						<a className="afooter" href="http://www.instagram.com">
							<i className="fab fa-instagram"></i>
						</a>
					</div>
					<div style={{ margin: "10px" }}>
						<a className="afooter" href="http://www.twitter.com">
							<i className="fab fa-twitter-square"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
);
