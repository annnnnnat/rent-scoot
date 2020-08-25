import axios from 'axios'

// const instance = axios.create({
//     baseUrl: 'http://192.168.99.102:8080',
//     headers: {
//         'Access-Control-Allow-Origin': '*'
//     }
// })
// const IP_LOC = "192.168.99.103";
const instance = axios.create();
instance.defaults.baseURL = `http://${process.env.REACT_APP_BACKEND_IP}:8080`;

export default instance