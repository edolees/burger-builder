import React from 'react'
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
const OrderSummary = props => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey) => {
            return (

                <li key={igKey}>
                    <span style={{ textTransform: "capitalize" }}>
                        {igKey}
                    </span> {props.ingredients[igKey]}
                </li>
            )
        });
    return (
        <Aux >
            <h3>Your Order</h3>
            <p>A Burger with the following ingredients : </p>
            <ul style={{ listStyleType: 'square' }}>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {props.price.toFixed(2)}$</strong></p>
            <Button btnMode='Button' btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
            <Button btnMode='Button' btnType='Danger' clicked={props.purchaseCanceled}>Cancel</Button>
        </Aux>
    )
}

export default OrderSummary;
