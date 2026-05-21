import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"

const StripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripeProvider = ({ children }) => {
    return <Elements stripe={StripePromise} >{children}</Elements>
};

export default StripeProvider;

