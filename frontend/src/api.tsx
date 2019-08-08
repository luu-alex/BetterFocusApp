import axios from 'axios';
import { AsyncStorage } from 'react-native';

const signInAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken);
    return userToken;
};

const http = axios.create({
  baseURL: `http://ali-raza.me:3000/api/`
});

http.interceptors.request.use (
    async function(config) {
        const token = await AsyncStorage.getItem('userToken');
        config.headers['x-access-token'] = token;
        return config;
    },
    function(err){
        return Promise.reject(err);
    }
)

export default http;