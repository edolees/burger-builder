import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.jpg'
import styles from './Logo.module.css';

const Logo = () => {
    return (
        <div className={styles.Logo}>
            <img src={burgerLogo} alt='MyBurger'></img>
        </div>
    )
}

export default Logo;
