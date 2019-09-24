import React, { useState } from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [showSideDrawerState, setShowSideDrawerState] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawerState(false);
    }
    const sideDrawerHandler = () => {
        setShowSideDrawerState((prevState) => (!showSideDrawerState))
    }
    return (
        <Aux>
            <Toolbar clicked={sideDrawerHandler} />
            <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawerState} />
            <main className={styles.Content}>{props.children}</main>
        </Aux>

    )
}

export default Layout;

