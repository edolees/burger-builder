import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';
const iniState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

describe('<Auth Reducer />', () => {
    it('should return the initial State', () => {
        expect(reducer(undefined, {})).toEqual(iniState);
    });
    it('should return the token upon login', () => {
        expect(reducer(iniState, { type: actionTypes.AUTH_SUCCESS, idToken: 'sometoken', userId: 'someuserId' })).toEqual({
            token: 'sometoken',
            userId: 'someuserId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
});