import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
    if(!stripePromise) {
        stripePromise = loadStripe('pk_test_51Lp5WEEMnCAQAhVdgsdP9CLGHS5qkN1Q4lOQP4Jh2kzZqrh2pgtoK6Z71s1MO38k2quXkzJsToZiOoS46jyTUw5000cJ3tt4Dp');
    }

    return stripePromise;

}

export default getStripe;