const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			devolutionProd: [],
			cart: [],
			list: [],
			products: [],
			message: null,
			product: null,
			user_p: [],
			user_nick: [],
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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
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
					});
			},
			signOut: () => {
				localStorage.removeItem("token");
				setStore({ isAuthenticate: false, user_nick: [] });
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
						}
					})
					.then(json => {
						console.log("json", json);
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
						setStore({ products: json.data });
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
			uploadFile: formData => {
				const store = getStore();

				fetch(process.env.BACKEND_URL + "/upload/profile", {
					method: "POST",

					body: formData
				})
					.then(resp => {
						console.log("respuesta", resp);
						if (resp.ok) {
							return resp.json();
						}
					})
					.then(data => {
						console.log("data", data);
					})
					.catch(error => console.log("[ERROR TO UPLOADO FILE]", error));
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
						setStore({ list: json.producto });
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
				setStore({ devolutionProd: devol });
			}
		}
	};
};

export default getState;
