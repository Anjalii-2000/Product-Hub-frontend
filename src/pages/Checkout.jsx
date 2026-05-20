import StripeWrapper from "../components/StripeWrapper";
import PaymentForm from "../components/PaymentForm";

function Checkout() {
    return (
        <StripeWrapper>
            <PaymentForm />
        </StripeWrapper>
    );
}

export default Checkout;