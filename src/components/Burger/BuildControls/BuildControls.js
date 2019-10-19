import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import Button from '../../UI/Button/Button'

const controls = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese ', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];
const BuildControls = props => {
    return (
        <div className={styles.BuildControls}>
            <p>Current Price : <strong>{props.price.toFixed(2)} $</strong></p>
            {controls.map((el) => (
                <BuildControl
                    key={el.label}
                    label={el.label}
                    added={() => props.ingredientAdded(el.type)}
                    removed={() => props.ingredientRemoved(el.type)}
                    disabled={props.disabled[el.type]}
                />
            ))}
            <Button
                btnMode='OrderButton'
                disabled={!props.purchase}
                clicked={props.purchasing}>
                {props.isAuth ? 'Order Now' : 'SIGN UP TO ORDER'}
            </Button>
        </div>
    )
}

export default BuildControls
