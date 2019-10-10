import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                ingredients={props.ings}
                onCheckoutCancelled={onCheckoutCancelled}
                onCheckoutContinue={onCheckoutContinue}
            />
            <Route
                path={props.match.path + '/contact-data'}
                component={ContactData}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
};


export default connect(mapStateToProps)(Checkout);
