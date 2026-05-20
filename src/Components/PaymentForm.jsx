import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {

const stripe = useStripe();
const elements = useElements();

const { cartItems, totalPrice } = useSelector((state) => state.cart);

const [loading, setLoading] = useState(false);

const handlePayment = async () => {

setLoading(true);

try {

const { data } = await axios.post(
    "http://localhost:5000/api/payment/create-payment-intent",
    {
        amount: totalPrice
    }
);

const result = await stripe.confirmCardPayment(
    data.clientSecret,
    {
        payment_method: {
            card: elements.getElement(CardElement),
        },
    }
);

if (result.paymentIntent?.status === "succeeded") {
    alert("Payment Successful");
    console.log("Items:", cartItems);
    console.log("Amount:", totalPrice);
}

setLoading(false);

} catch (error) {
    console.log(error);
    setLoading(false);
}
};

return (
    <div>
        <h2>Payment Page</h2>

        <CardElement />

        <button onClick={handlePayment} disabled={!stripe || loading}>
            {loading ? "Processing..." : "Pay Now"}
        </button>
    </div>
);
};

export default PaymentForm;