import axios from "axios";


const user = JSON.parse(localStorage.getItem("user"));
const customAPI = () => axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {
        Authorization: user ? `Bearer ${user.token}`: ''
    }
})
export default customAPI;