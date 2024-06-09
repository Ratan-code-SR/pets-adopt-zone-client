import PropTypes from 'prop-types';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from '../../../../Hooks/useAuth';
import Swal from 'sweetalert2';
const CheckoutForm = ({ paymentInfo }) => {
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const formRef = useRef(null);
    const { petImage, petName, donateAmount, _id } = paymentInfo;
    console.log(donateAmount);

    useEffect(() => {
        if (donateAmount > 0) {
            axiosSecure.post('/create-payment-intent', { donateAmount: donateAmount })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    console.error("Error creating payment intent:", error);
                    setError("Failed to initialize payment. Please try again.");
                });
        }
    }, [axiosSecure, donateAmount]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                email: user?.email || "anonymous",
                name: user?.displayName || "anonymous"
            },
        });

        if (methodError) {
            console.log('[methodError]', methodError);
            setError(methodError.message);
            return;
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError(null);
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                },
            },
        });

        if (confirmError) {
            console.log('[confirmError]', confirmError);
            setError(confirmError.message);
        } else {
            console.log('[PaymentIntent]', paymentIntent);
            setError(null);
            setTransactionId(paymentIntent.id);

            const payment = {
                email: user?.email,
                amount: donateAmount,
                date: new Date(),
                transactionId: paymentIntent.id,
                petImage,
                petId: _id,
                petName
            }
            const res = await axiosSecure.post('/payments', payment)
            console.log(res.data);
            if (res.data?.paymentResult?.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: `Your data has been updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            formRef.current.reset();
            elements.getElement(CardElement).clear();
            setClientSecret('');

        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div>
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }} />
                </div>
                <button className="btn btn-primary my-4 mx-auto flex items-center px-48" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {error && <p className="text-red-400">{error}</p>}
            {transactionId && <p className="text-green-400 text-center">Your payment success  transaction ID: {transactionId}</p>}
        </>
    );
};
CheckoutForm.propTypes = {
    paymentInfo: PropTypes.object.isRequired
};
export default CheckoutForm;


