import React, { useState } from 'react'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [errorState, setErrorState] = useState(null);
        axios.interceptors.request.use(req => {
            setErrorState(null);
            return req;
        });
        axios.interceptors.response.use(res => res, error => {
            console.log(error);
            setErrorState(error)
        })
        /*useEffect(() => {
            
        }, []);*/
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