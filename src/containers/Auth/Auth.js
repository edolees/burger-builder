import React, { useState } from 'react';
import { connect } from 'react-redux'
import styles from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionObject from '../../store/actions/index';

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validator: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: '****'
            },
            value: '',
            validator: {
                required: true,
                minLength: 7
            },
            valid: false,
            touched: false
        }

    });
    const [isSignUp, setSignUp] = useState(true);
    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;

    }

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validator),
                touched: true
            }
        }
        setControls(updatedControls)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    }

    const switchAuthModeHandler = () => {
        let isSign = isSignUp
        setSignUp(!isSign);
    }

    const formElementsArray = [];
    // eslint-disable-next-line no-unused-vars
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            setup: controls[key]
        });
    }
    let form = formElementsArray.map(formElement => (
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
    ));

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }
    return (
        <div className={styles.Auth}>
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">
                    Submit
                </Button>
            </form>

            <Button clicked={switchAuthModeHandler} btnType='Danger'>{isSignUp ? 'Sign In' : 'Sign Up'}?</Button>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSign) => dispatch(actionObject.auth(email, password, isSign)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)