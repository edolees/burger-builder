import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.7,
}

const BurgerBuilder = props => {

    const [burgerState, setBurgerState] = useState({
        ingredients: {}
    })
    const [price, setPrice] = useState(4.00)
    const [purchaseState, setPurchaseState] = useState({ purchase: false });
    const [purchasingState, setPurchasingState] = useState(false);
    const loadingState = useState(false);
    const [errorState, setError] = useState(false)


    useEffect(() => {
        axios.get('/ingredients.json')
            .then(res => {
                setBurgerState({ ingredients: res.data });
            })
            .catch(error => {
                setError(true);
            })
    }, []);


    const updatePurchaseHandler = (ing) => {

        const sum = Object.keys(ing)
            .map((igKey) => {
                return ing[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        setPurchaseState({ purchase: sum > 0 })
    }


    const addIngredientHandler = (type) => {
        const oldCount = burgerState.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...burgerState.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];

        const oldPrice = price;
        const newPrice = oldPrice + priceAddition;
        setBurgerState({ ingredients: updatedIngredients })


        setPrice(newPrice);
        updatePurchaseHandler(updatedIngredients);
    }


    const removeIngredientHandler = (type) => {
        const oldCount = burgerState.ingredients[type];
        if (oldCount <= 0) {
            return;

        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...burgerState.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];

        const oldPrice = price;
        const newPrice = oldPrice - priceDeduction;

        setBurgerState({ ingredients: updatedIngredients })
        setPrice(newPrice);
        updatePurchaseHandler(updatedIngredients);
    }


    const purchasingHandler = () => {
        setPurchasingState(true)
    }


    const purchaseCancel = () => {
        setPurchasingState(false)
    }


    const purchaseContinue = () => {
        const queryParams = [];
        // eslint-disable-next-line no-unused-vars
        for (let i in burgerState.ingredients)
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(burgerState.ingredients[i]));
        queryParams.push('price=' + price)
        const queryJoin = queryParams.join('&');

        props.history.push({

            pathname: '/checkout',
            search: '?' + queryJoin
        });
    }


    let orderSummary = null;
    let burger = errorState ? <p>Ingredients cant be loaded</p> : <Spinner />

    if (loadingState) {
        orderSummary = <Spinner />;
    }

    const disabledInfo = {
        ...burgerState.ingredients
    }

    // eslint-disable-next-line no-unused-vars
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    if (burgerState.ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={burgerState.ingredients} />
                <BuildControls
                    ingredientAdded={addIngredientHandler}
                    ingredientRemoved={removeIngredientHandler}
                    disabled={disabledInfo}
                    price={price}
                    purchase={purchaseState.purchase}
                    purchasing={purchasingHandler} />
            </Aux>)

        orderSummary =
            <OrderSummary
                ingredients={burgerState.ingredients}
                purchaseCanceled={purchaseCancel}
                purchaseContinued={purchaseContinue}
                price={price} />

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

export default withErrorHandler(BurgerBuilder, axios);
