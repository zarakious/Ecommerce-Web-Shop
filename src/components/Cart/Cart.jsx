import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({ cart, OnUpdateCartQty, OnRemoveFromCart, OnEmptyCart }) => {
	const classes = useStyles();

	const Emptycart = () => {
		return (
			<Typography varaiant="h3">
				You have no items in your shopping cart,start adding some !<br />
				<Link to="/" className={classes.link}>
					Start Adding Some !!
				</Link>
			</Typography>
		);
	};

	const FilledCart = () => {
		return (
			<>
				<Grid container spacing={3}>
					{cart.line_items.map((item) => (
						<Grid item xs={12} sm={4} key={item.id}>
							<div>
								<CartItem
									item={item}
									OnUpdateCartQty={OnUpdateCartQty}
									OnRemoveFromCart={OnRemoveFromCart}
								/>
							</div>
						</Grid>
					))}
				</Grid>
				<div className={classes.cardDetails}>
					<Typography variant="h4">
						Subtotal : {cart.subtotal.formatted_with_symbol}
					</Typography>
					<Button
						className={classes.emptyButton}
						size="large"
						type="button"
						variant="contained"
						color="secondary"
						onClick={() => OnEmptyCart()}
					>
						Empty Cart
					</Button>
					<Button
						className={classes.checkoutButton}
						size="large"
						type="button"
						variant="contained"
						color="primary"
						component={Link}
						to="/checkout"
					>
						Checkout
					</Button>
				</div>
			</>
		);
	};
	if (!cart.line_items) return "loading......";
	return (
		<Container>
			<div className={classes.toolbar} />
			<Typography className={classes.title} variant="h3" gutterBottom>
				Your Shopping Cart
			</Typography>
			{cart.line_items.length === 0 ? <Emptycart /> : <FilledCart />}
		</Container>
	);
};

export default Cart;
