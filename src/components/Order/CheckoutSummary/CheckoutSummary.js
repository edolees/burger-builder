import React from 'react'
import styles from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
const CheckoutSummary = props => {
    return (
        <div className={styles.COS}>
            <h1>We hope it taste Well</h1>
            <div >
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.onCheckoutCancelled}>Cancel</Button>
            <Button
                btnType="Success"
                clicked={props.onCheckoutContinue}>Continue</Button>
        </div>
    )
}

export default CheckoutSummary
