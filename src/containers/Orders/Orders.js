import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionObject from '../../store/actions/index';


const Orders = props => {

    useEffect(() => {
        props.onFetchOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let loadingOrders = <Spinner />

    if (!props.loading) {
        loadingOrders = (
            props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price} />
            ))
        );
    }
    return (
        <div>
            {loadingOrders}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actionObject.fetchOrders())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
