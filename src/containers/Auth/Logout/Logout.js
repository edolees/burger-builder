import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionObject from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';


const Logout = props => {
    useEffect(() => {
        props.onLogout(props.history);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Redirect to='/' />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionObject.authLogout())
    }
}
export default connect(null, mapDispatchToProps)(Logout);
