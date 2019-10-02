import React, { useState, useEffect } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = () => {
    const [orders, setOrders] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                // eslint-disable-next-line no-unused-vars
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key,
                    })
                }
                setOrders(fetchedOrders)
                setLoading(false);
            })
            .catch(err => {
                setLoading(true);
            })
    }, [])
    let loadingOrders = <Spinner />

    if (!loading) {
        loadingOrders = (
            orders.map(order => (
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

export default withErrorHandler(Orders, axios)
