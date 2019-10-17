import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const NavigationItems = props => {
    return (
        <div>
            <ul className={styles.NavigationItems}>
                <NavigationItem link='/' exact>Burger Builder</NavigationItem>
                {props.isAuthenticated ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}
                {!props.isAuthenticated
                    ? <NavigationItem link='/auth'>Authenticate</NavigationItem>
                    : <NavigationItem link='/logout'>Log Out</NavigationItem>
                }
            </ul>
        </div>
    )
}

export default NavigationItems
