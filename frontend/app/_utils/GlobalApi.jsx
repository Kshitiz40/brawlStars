import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/'
})

const getCategory = () => axiosClient.get('/products/categories')

export default {
    getCategory
}