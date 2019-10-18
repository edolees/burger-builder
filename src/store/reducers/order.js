import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const purchaseInit = (state, action) => updatedObject(state, {
    purchased: false
});

const purchaseBurgerStart = (state, action) => updatedObject(state, {
    purchased: true
});

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updatedObject(action.orderData, {
        id: action.id.name
    });

    const updatedPurchaseSuccess = {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    }
    return updatedObject(state, updatedPurchaseSuccess);
};

const purchaseBurgerFail = (state, action) => updatedObject(state, {
    loading: false
});

const fetchOrdersStart = (state, action) => updatedObject(state, {
    loading: true
});

const fetchOrdersSuccess = (state, action) => {
    const updatedFetchSuccess = {
        orders: action.orders,
        loading: false,
    }
    return updatedObject(state, updatedFetchSuccess);
};

const fetchOrdersFail = (state, action) => updatedObject(state, {
    loading: false
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state
    }
};

export default reducer;