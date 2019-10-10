import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';



const BurgerBuilder = props => {

    const [purchaseState, setPurchaseState] = useState({ purchase: false });
    const [purchasingState, setPurchasingState] = useState(false);
    const loadingState = useState(false);
    const [errorState, setError] = useState(false)

    /*
    useEffect(() => {
        axios.get('/ingredients.json')
            .then(res => {
                setBurgerState({ ingredients: res.data });
            })
            .catch(error => {
                setError(true);
            })
    }, []);*/


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
        setPurchasingState(true)
    }


    const purchaseCancel = () => {
        setPurchasingState(false)
    }


    const purchaseContinue = () => {
        props.history.push('/checkout');
    }


    let orderSummary = null;
    let burger = errorState ? <p>Ingredients cant be loaded</p> : <Spinner />

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
                    purchasing={purchasingHandler} />
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
        ings: state.ingredients,
        price: state.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
