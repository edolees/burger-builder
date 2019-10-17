import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionObject from '../../store/actions/index';



const BurgerBuilder = props => {

    const [purchasingState, setPurchasingState] = useState(false);
    const loadingState = useState(false);


    useEffect(() => {
        props.onInitIngredients();
        console.log(props);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const updatePurchaseHandler = (ing) => {

        const sum = Object.keys(ing)
            .map((igKey) => {
                return ing[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0
    }



    const purchasingHandler = () => {
        if (props.isAuthenticated) {
            setPurchasingState(true)
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }


    const purchaseCancel = () => {
        setPurchasingState(false)
    }


    const purchaseContinue = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }


    let orderSummary = null;
    let burger = props.error ? <p>Ingredients cant be loaded</p> : <Spinner />

    if (loadingState) {
        orderSummary = <Spinner />;
    }

    const disabledInfo = {
        ...props.ings
    }

    // eslint-disable-next-line no-unused-vars
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={props.price}
                    purchase={updatePurchaseHandler(props.ings)}
                    purchasing={purchasingHandler}
                    isAuth={props.isAuthenticated} />
            </Aux>)

        orderSummary =
            <OrderSummary
                ingredients={props.ings}
                purchaseCanceled={purchaseCancel}
                purchaseContinued={purchaseContinue}
                price={props.price} />

    }
    return (
        <Aux>
            <Modal show={purchasingState} modalClosed={purchaseCancel}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionObject.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionObject.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionObject.initIngredients()),
        onInitPurchase: () => dispatch(actionObject.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionObject.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
