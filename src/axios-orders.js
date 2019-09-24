import axios from 'axios';

const instace = axios.create({
    baseURL: 'https://react-burger-builder-2d09e.firebaseio.com/',
});

export default instace