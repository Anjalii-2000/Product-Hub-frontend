import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const location = useLocation();
    const product = location.state?.product;

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);

        try {
            const { data } = await axios.post(
                "http://localhost:3000/create-payment-intent",
                {
                    amount: product.price
                }
            );

            const cardElement = elements.getElement(CardElement);

            const { error, paymentIntent } =
                await stripe.confirmCardPayment(data.clientSecret, {
                    payment_method: {
                        card: cardElement
                    }
                });

            if (error) {
                setMessage(error.message);
            } else if (paymentIntent.status === "succeeded") {
                setMessage("Payment Successful 🎉");
            }
        } catch (err) {
            setMessage(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">

            <h2 className="text-xl font-bold mb-4">
                Checkout - {product?.productName}
            </h2>

            <p className="mb-4">Price: ₹{product?.price}</p>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="p-3 border rounded">
                    <CardElement />
                </div>

                <button
                    disabled={!stripe || loading}
                    className="w-full bg-indigo-600 text-white py-2 rounded"
                >
                    {loading ? "Processing..." : `Pay ₹${product?.price}`}
                </button>
            </form>

            {message && (
                <p className="mt-4 text-center">{message}</p>
            )}
        </div>
    );
};

export default CheckoutForm;