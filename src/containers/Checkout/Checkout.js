import React, { useState, useEffect } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

const Checkout = props => {

    const [ingredients, setIngredients] = useState({})
    const [price, setPrice] = useState(0);

    useEffect(() => {

        const query = new URLSearchParams(props.location.search);


        const ing = {}
        let price = 0;
        // eslint-disable-next-line no-unused-vars
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ing[param[0]] = +param[1]
            }
        }
        setIngredients(ing)
        setPrice(price);
    }, [])

    const onCheckoutCancelled = () => {
        props.history.goBack();
    }

    const onCheckoutContinue = () => {
        props.history.replace('/checkout/contact-data');
    }
    return (
        <div>
            <CheckoutSummary
                ingredients={ingredients}
                onCheckoutCancelled={onCheckoutCancelled}
                onCheckoutContinue={onCheckoutContinue}
            />
            <Route
                path={props.match.path + '/contact-data'}
                render={props => (<ContactData ingredients={ingredients} price={price} {...props} />)} />
        </div>
    )
}

export default Checkout
