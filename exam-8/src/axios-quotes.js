import axios from 'axios';

const axiosQuotes = axios.create({
    baseURL: 'https://quotes-aman-chermashev.firebaseio.com/'
});

export default axiosQuotes;