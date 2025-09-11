import axios from "axios";

const api = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org',
});

export const getCity = (url, query = '') => api.get(url+query+'&format=json');
export const getFastFood = (url, query = '') => api.get(url+'fast_food+in+'+query+'&format=json&limit=40');

export default api