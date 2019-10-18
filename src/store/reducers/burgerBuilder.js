import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    price: 4,
    error: false,
};

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.7,
};

const addIngredient = (state, action) => {
    const updatedIngAdd = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredientsAdd = updatedObject(state.ingredients, updatedIngAdd);
    const updatedStateAdd = {
        ingredients: updatedIngredientsAdd,
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updatedObject(state, updatedStateAdd);
};

const removeIngredient = (state, action) => {
    const updatedIngRemove = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngredientsRemove = updatedObject(state.ingredients, updatedIngRemove);
    const updatedStateRemove = {
        ingredients: updatedIngredientsRemove,
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
        building: true

    };
    return updatedObject(state, updatedStateRemove);
};

const setIngredients = (state, action) => {
    const updatedIngSet = {
        ingredients: {
            lettuce: action.ingredients.lettuce,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        price: 4,
        error: false,
        building: false

    };
    return updatedObject(state, updatedIngSet);
};

const fetchIngredientsFailed = (state, action) => updatedObject(state, { error: true });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state
    };
};

export default reducer;