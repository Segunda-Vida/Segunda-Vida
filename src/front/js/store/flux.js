const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			devolutionProd: [],
			cart: [],
			list: [],
			products: [],
			message: null,
			mensaje: null,
			product: null,
			product_exist: false,
			product_loaded: false,
			product_loaded_error: false,
			user_p: [],
			user_nick: [],
			user_log: null,
			user_regis: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			isAuthenticate: false,
			isRegistered: false,
			isBougth: false,
			isProfile: process.env.BACKEND_URL + "/perfil"
		},
		actions: {
			login: (email, password) => {
				const store = getStore();

				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
					.then(resp => {
						if (resp.ok) {
							return resp.json();
						}
					})
					.then(data => {
						localStorage.setItem("token", data.token);
						setStore({ isAuthenticate: true });
						setStore({ mensaje: "¡Bienvenido/a!", user_log: true });
					});
			},
			signOut: () => {
				localStorage.removeItem("token");
				setStore({ isAuthenticate: false, user_nick: [] });
				setStore({ mensaje: "¡Hasta pronto!", user_log: false });
			},

			verifySession: () => {
				let token = localStorage.getItem("token");
				if (token && token.length > 0) {
					setStore({ isAuthenticate: true });
				} else {
					setStore({ isAuthenticate: false });
				}
			},
			register: (nickname, email, password) => {
				const store = getStore();

				fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						nickname: nickname,
						email: email,
						password: password
					})
				})
					.then(resp => {
						if (resp.ok) {
							return resp.json();
						}
					})
					.then(data => {
						setStore({ message: data.msg });
						setStore({ mensaje: "Usuario registrado", user_regis: true });
						setStore({ isRegistered: true });
					});
			},
			pushProduct: form => {
				const store = getStore();

				fetch(process.env.BACKEND_URL + "/api/products", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`
					},
					body: form
				})
					.then(resp => {
						if (resp.ok) {
							return resp.json();
						} else if (resp.status === 401) {
							setStore({ message: "Token authentication expired", product_loaded_error: true });
						}
					})
					.then(json => {
						if (json !== undefined) {
							console.log("json", json);
							setStore({ message: "Producto cargado", product_loaded: true });
						}
					})
					.catch(error => {
						console.log("ERROR TO PUSH PRODUCT", error);
					});
			},
			buscador: () => {
				const store = getStore();

				fetch(process.env.BACKEND_URL + "/api/products")
					.then(resp => {
						if (resp.ok) {
							return resp.json();
						}
					})
					.then(json => {
						console.log("data", json);
						if (json !== undefined) {
							setStore({ products: json.data });
						} else {
							setStore({ products: [] });
						}
					});
			},
			forgotPassword: email => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "/forgot-password", {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						email: email
					})
				})
					.then(resp => {
						if (resp.ok) {
							return resp.json();
						}
					})
					.then(data => console.log("data", data))
					.catch(error => console.error("[error when recovery password]", error));
			},
			getProduct: id => {
				const store = getStore();

				fetch(process.env.BACKEND_URL + `/api/product/${id}`, {
					method: "GET",
					headers: {
						"Content-type": "application/json"
					}
				})
					.then(resp => {
						console.log("resp sin json", resp);
						if (resp.ok) {
							return resp.json();
						}
					})
					.then(data => {
						console.log("resp", { ...data });
						console.log(JSON.parse(data.product_image_url)[0]);

						setStore({
							product: { ...data, product_image_url: JSON.parse(data.product_image_url) }
						});
					})
					.catch(error => console.error("[ERROR IN GET PRODUCT D]", error));
			},
			getPrAll: () => {
				const store = getStore();

				fetch(process.env.BACKEND_URL + "/api/product")
					.then(resp => {
						if (resp.ok) {
							return resp.json();
						}
					})
					.then(json => {
						console.log("producto", json);
						if (json !== undefined) {
							setStore({ list: json.producto });
						} else {
							setStore({ list: [] });
						}
					})
					.catch(error => {
						console.log("[ERROR TO GETPRALL]", error);
					});
			},
			getPrUser: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `/api/productP`, {
					method: "GET",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
					.then(resp => {
						console.log("resp NO", resp);
						if (resp.ok) {
							return resp.json();
						}
					})
					.then(info => {
						console.log("info", info);
						setStore({ user_p: info });
					});
			},
			AddCart: newItem => {
				let storeCopy = getStore();
				let cart = storeCopy.cart;
				if (cart.length > 0) {
					for (let i = 0; i < cart.length; i++) {
						if (cart[i].id === newItem.id) {
							alert("El producto ya está en el carrito");
						} else {
							cart.push(newItem);
							localStorage.setItem("cart", JSON.stringify(cart));
							setStore({ cart: cart });
						}
					}
				} else {
					cart.push(newItem);
					localStorage.setItem("cart", JSON.stringify(cart));
					setStore({ cart: cart });
				}
			},
			quitCart: element => {
				let storeCopy = getStore();
				let quitCart = storeCopy.cart.filter((item, index) => {
					return item !== element;
				});
				setStore({ cart: quitCart });
				setStore({ devolutionProd: quitCart });
			},
			deleteCart: () => {
				setStore({ cart: [] });
			},
			getUserNick: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "/api/user", {
					method: "GET",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
					.then(resp => {
						if (resp.ok) {
							return resp.json();
						}
					})
					.then(resp => {
						if (resp) {
							console.log("userNik", resp);
							setStore({ user_nick: resp.user });
						} else {
							setStore({ user_nick: "" });
						}
					});
			},
			devProd: () => {
				let storeCopy = getStore();

				let devol = storeCopy.cart;
				let cart = devol.map(item => {
					let temp = Object.assign({}, item);
					temp.is_bough = 0;
					return temp;
				});
				console.log("el cart", cart);
				for (let item of cart) {
					console.log("item", item);
					fetch(process.env.BACKEND_URL + "/api/prBough/" + item.id, {
						method: "GET",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("token")}`
						}
					})
						.then(resp => {
							if (resp.ok) {
								return resp.json();
							}
						})
						.then(data => {
							console.log("la data", data);
						});
				}

				setStore({ devolutionProd: cart });
			},

			bought: () => {
				let storeCopy = getStore();
				let devol = storeCopy.devolutionProd;
				if (devol.length > 0) {
					setStore({ isBougth: true });
				} else {
					setStore({ isBougth: false });
				}
			}
		}
	};
};

export default getState;
