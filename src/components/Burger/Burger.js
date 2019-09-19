import React from 'react'
import styles from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
const Burger = props => {

    let transformedIng = Object.keys(props.ingredients) // making an array of the keys ex ['a','b']
        .map((ing) => {
            return [...Array(props.ingredients[ing])] // Making an empty Array of X values ,
                .map((_, i) => {
                    return <BurgerIngredients key={ing + i} type={ing} />
                });
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, [])
    if (transformedIng.length === 0) {
        transformedIng = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIng}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
}

export default Burger;
