import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

const ContactData = props => {

    const [contact, setContact] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validator: {
                required: true,
            },
            valid: false,
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street Name'
            },
            value: '',
            validator: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: ' Zip Code'
            },
            value: '',
            validator: {
                required: true,
                minLength: 4,
                maxLength: 5,
            },
            valid: false,
            touched: false,
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validator: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validator: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' },
                ]
            },
            validator: {},
            value: 'fastest',
            valid: true,

        }
    });
    const [isValidForm, setIsValidForm] = useState(false);
    const [loadingState, setLoadingState] = useState(false)


    const orderHandler = (event) => {
        event.preventDefault();
        const contactData = {}
        for (let key in contact) {
            contactData[key] = contact[key].value
        }
        setLoadingState(true);
        const orders = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: contactData,
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


    const checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;

    }


    const inputChangeHandler = (event, inputIdentifier) => {
        const updatedContact = {
            ...contact
        }
        const updatedContactElement = { ...updatedContact[inputIdentifier] }
        updatedContactElement.value = event.target.value;
        updatedContactElement.valid = checkValidity(updatedContactElement.value, updatedContactElement.validator);
        updatedContactElement.touched = true;
        updatedContact[inputIdentifier] = updatedContactElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedContact) {

            formIsValid = updatedContact[inputIdentifier].valid && formIsValid
        }
        setContact({ ...updatedContact });
        setIsValidForm(formIsValid);
    }

    const formElementsArray = [];

    for (let key in contact) {
        formElementsArray.push({
            id: key,
            setup: contact[key]
        });
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => {

                return (
                    <Input
                        key={formElement.id}
                        elementType={formElement.setup.elementType}
                        elementConfig={formElement.setup.elementConfig}
                        value={formElement.setup.value}
                        invalid={!formElement.setup.valid}
                        shouldValidate={formElement.setup.validator}
                        touched={formElement.setup.touched}
                        changed={(event) => (inputChangeHandler(event, formElement.id))}
                    />
                )
            })}
            <Button btnType="Success" disabled={!isValidForm}>ORDER</Button>
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