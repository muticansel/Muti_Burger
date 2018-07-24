import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://muti-burger.firebaseio.com/'
});

export default instance;