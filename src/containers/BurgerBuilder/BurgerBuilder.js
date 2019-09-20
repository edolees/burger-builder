import React, { useState } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.7,
}

const BurgerBuilder = props => {

    const [burgerState, setBurgerState] = useState({
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        price: 4.00
    })
    const [purchaseState, setPurchaseState] = useState({ purchase: false });
    const [purchasingState, setPurchasingState] = useState(false);


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

        const oldPrice = burgerState.price;
        const newPrice = oldPrice + priceAddition;

        setBurgerState({ ingredients: updatedIngredients, price: newPrice })
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

        const oldPrice = burgerState.price;
        const newPrice = oldPrice - priceDeduction;

        setBurgerState({ ingredients: updatedIngredients, price: newPrice })
        updatePurchaseHandler(updatedIngredients);
    }
    const purchasingHandler = () => {
        setPurchasingState(true)
    }

    const purchaseCancel = () => {
        setPurchasingState(false)
    }
    const purchaseContinue = () => {
        alert("You continue")
    }

    const disabledInfo = {
        ...burgerState.ingredients
    }

    // eslint-disable-next-line no-unused-vars
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
        <Aux>
            <Modal show={purchasingState} modalClosed={purchaseCancel}>
                <OrderSummary
                    ingredients={burgerState.ingredients}
                    purchaseCanceled={purchaseCancel}
                    purchaseContinued={purchaseContinue}
                />
            </Modal>
            <Burger ingredients={burgerState.ingredients} />
            <BuildControls
                ingredientAdded={addIngredientHandler}
                ingredientRemoved={removeIngredientHandler}
                disabled={disabledInfo}
                price={burgerState.price}
                purchase={purchaseState.purchase}
                purchasing={purchasingHandler} />


        </Aux>
    )
}

export default BurgerBuilder;
