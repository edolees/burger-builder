import React from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';


const layout = props => {
    return (
        <Aux>
            <Toolbar />
            <div>
                ToolBar , SideBar , Backdrop
            </div>
            <main className={styles.Content}>{props.children}</main>
        </Aux>

    )
}

export default layout;

