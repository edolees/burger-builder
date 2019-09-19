import React, { useState } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    const [purchaseState, setPurchaseState] = useState({ purchase: false })

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

    const disabledInfo = {
        ...burgerState.ingredients
    }

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
        <Aux>
            <Burger ingredients={burgerState.ingredients} />
            <BuildControls
                ingredientAdded={addIngredientHandler}
                ingredientRemoved={removeIngredientHandler}
                disabled={disabledInfo}
                price={burgerState.price}
                purchase={purchaseState.purchase} />

        </Aux>
    )
}

export default BurgerBuilder;
