import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-7b7cc.firebaseio.com/'
})

export default instance;