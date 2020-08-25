import axios from '../custom-axios/axios'
import qs from 'qs'

const userService = {
    fetchUserById : (userId) => {
        return axios.get(`/api/manage/users/id/${userId}`) //check again
    },
    addUser : (user) => {
        const data = {
            ...user
        } //make sure correct data is transfered
        const formParams = qs.stringify(data);
        return axios.post("/api/manage/users",formParams,{
            headers : {
                'Content-type' : 'application/x-www-form-urlencoded' //add security headers ?
            }
        })
    }
}

export default userService;