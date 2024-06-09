import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import PropTypes from 'prop-types';
const Payment = ({paymentInfo}) => {
    // Load Stripe with the publishable key from environment variables
    const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm paymentInfo={paymentInfo} />
            </Elements>
        </div>
    );
};

Payment.propTypes = {
    paymentInfo: PropTypes.object.isRequired,
};



export default Payment;
