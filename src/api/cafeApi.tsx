import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://192.168.0.2:8080/api';

const cafeApi = axios.create({baseURL: baseUrl});

//Middleware to add token to the requests
cafeApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export default cafeApi;
