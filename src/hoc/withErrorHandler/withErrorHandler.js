import React, { useState, useEffect } from 'react'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {

    return (props) => {
        const [errorState, setErrorState] = useState(null);
        let reqInterceptors = axios.interceptors.request.use(req => {
            setErrorState(null);
            return req;
        });
        let resInterceptors = axios.interceptors.response.use(res => res, error => {
            console.log(error);
            setErrorState(error)
        })

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptors);
                axios.interceptors.response.eject(resInterceptors);
            }
        }, [reqInterceptors, resInterceptors]);


        const errorConfirmHandler = () => {
            setErrorState(null)
        };


        return (
            <Aux>
                <Modal
                    show={errorState}
                    modalClosed={errorConfirmHandler}>
                    {errorState ? errorState.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;