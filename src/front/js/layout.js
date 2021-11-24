import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Inicio } from "./pages/inicio";
import { Perfil } from "./pages/perfil";
import { ProductDetail } from "./pages/productDetail";
import { ProductProfile } from "./pages/productProfile";
import { Footer } from "./component/footer";
import Products from "./pages/products";
import { Devolucion } from "./pages/devolucion";
import { CheckoutPage } from "./pages/checkout";
import { Cart } from "./pages/cart";
import { Electrodomesticos } from "./pages/electrodomesticos";
//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Switch>
						<Route exact path="/products/:text">
							<Products />
						</Route>
						<Route exact path="/home">
							<Home />
						</Route>
						<Route exact path="/checkout">
							<CheckoutPage />
						</Route>
						<Route exact path="/productDetail/:id?">
							<ProductDetail />
						</Route>
						<Route exact path="/perfil">
							<Perfil />
						</Route>
						<Route exact path="/productProfile">
							<ProductProfile />
						</Route>
						<Route exact path="/cart">
							<Cart />
						</Route>
						<Route exact path="/devolucion">
							<Devolucion />
						</Route>
						<Route exact path="/">
							<Inicio />
						</Route>
						<Route exact path="/electrodomesticos">
							<Electrodomesticos />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
