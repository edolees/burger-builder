import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders';

const ContactData = props => {

    const [contact, setContact] = useState({
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        }
    });

    const [loadingState, setLoadingState] = useState(false)

    const orderHandler = (event) => {
        event.preventDefault();
        setLoadingState(true)
        const orders = {
            ingredients: props.ingredients,
            price: props.price,
            customer: {
                name: 'Eduardo Leon',
                address: {
                    street: 'GlWithThat Avenue',
                    zipCode: '921983',
                    country: 'Japan'
                },
                email: 'burger@nice.uhm',
            },
            deliveryMethod: 'fast',
        }
        axios.post('/orders.json', orders)
            .then(response => {
                setLoadingState(false);
                props.history.push('/');
            })
            .catch(error => {
                setLoadingState(false)
            });
    }
    let form = (
        <form>
            <input type='text' name='name' placeholder='Name' />
            <input type='text' name='email' placeholder='Email' />
            <input type='text' name='street' placeholder='Address' />
            <input type='text' name='postal' placeholder='Postal code' />
            <Button btnType='Success' clicked={orderHandler}>Order</Button>
        </form>
    );
    if (loadingState) {
        form = <Spinner />
    }
    return (
        <div className={styles.ContactData}>
            <h4>Enter your data  please</h4>
            {form}
        </div>
    )
}

export default ContactData;