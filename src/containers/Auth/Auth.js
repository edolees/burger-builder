import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actionObject from '../../store/actions/index';
import { updatedObject, checkValidity } from '../../shared/utility';

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-Mail Address'
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
                placeholder: 'Password'
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

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = updatedObject(controls, {
            [controlName]: updatedObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validator),
                touched: true,
            })
        });
        setControls(updatedControls);
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
    };

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
        form = (<Spinner />);
    };

    let errorMessage = null
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    };

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    };

    const switchingOnSignUp = (valueTrue, valueFalse) => {
        if (isSignUp) {
            return valueTrue
        } else {
            return valueFalse
        }
    }

    return (
        <div className={styles.Auth}>
            <h2>{isSignUp ? 'Register' : 'Log In'}</h2>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnMode='ButtonForm' btnType="SucessForm">
                    {switchingOnSignUp('Sign Up', 'Sign In')}
                </Button>

            </form>
            <p onClick={switchAuthModeHandler}>{isSignUp ? 'Already have an account' : 'Do you want to Register'}?</p>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSign) => dispatch(actionObject.auth(email, password, isSign)),
        onSetAuthRedirectPath: () => dispatch(actionObject.setAuthRedirectPath('/'))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);