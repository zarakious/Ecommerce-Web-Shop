import React, { useState } from "react";
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	CircularProgress,
	Divider,
	Button,
} from "@material-ui/core";
import { CallMissedSharp } from "@material-ui/icons";
import useStyles from "./styles";

const steps = ["Shipping Adress", "Payment Details"];

const Checkout = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	return (
		<>
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant="h4" align="center">
						Checkout
					</Typography>
				</Paper>
				<Stepper activeStep={activeStep} className={classes.stepper}>
					{steps.map((step) => (
						<Step key={step}>
							<StepLabel>{step}</StepLabel>
						</Step>
					))}
				</Stepper>
			</main>
		</>
	);
};

export default Checkout;
