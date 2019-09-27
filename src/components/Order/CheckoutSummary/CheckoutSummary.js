import React from 'react'
import styles from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
const CheckoutSummary = props => {
    return (
        <div className={styles.COS}>
            <h1>We hope it taste Well</h1>
            <div className={styles.COSD}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked>Cancel</Button>
            <Button
                btnType="Success"
                clicked>Continue</Button>
        </div>
    )
}

export default CheckoutSummary
