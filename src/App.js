import React, { useState, useEffect } from "react";
import "./App.css";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		console.log(data);
		setProducts(data);
	};
	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
		console.log(cart);
	};

	const handleAddToCart = async (productId, quantity) => {
		const item = await commerce.cart.add(productId, quantity);
		setCart(item.cart);
	};
	const handleUpdateCartQty = async (productId, quantity) => {
		const item = await commerce.cart.update(productId, { quantity });
		setCart(item.cart);
	};

	const handleRemoveFromCart = async (productId) => {
		const item = await commerce.cart.remove(productId);
		setCart(item.cart);
		console.log("Item removed from cart");
	};
	const handleEmptyCart = async () => {
		const response = commerce.cart.empty();
		setCart(response);
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
		handleEmptyCart();
	}, []);

	return (
		<Router>
			<div>
				<Navbar totalItems={cart.total_items} />
				<Switch>
					<Route exact path="/">
						<Products products={products} onAddToCart={handleAddToCart} />
					</Route>
					<Route exact path="/cart">
						<Cart
							cart={cart}
							OnUpdateCartQty={handleUpdateCartQty}
							OnRemoveFromCart={handleRemoveFromCart}
							OnEmptyCart={handleEmptyCart}
						/>
					</Route>
					<Route exact path="/checkout">
						<Checkout cart={cart} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
