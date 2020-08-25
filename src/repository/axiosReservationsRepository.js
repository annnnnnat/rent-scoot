import axios from '../custom-axios/axios'
import qs from 'qs'

const reservationsService = {
    fetchUserReservations : (userId) => {
        return axios.get(`/api/manage/reservations/${userId}`)
    },
    fetchReservationById : (reservationId) => {
        return axios.get(`/api/manage/reservations/${reservationId}`)
    },
    createReservation : (reservation) => {
        const data = {
            startDate: reservation.startDate,
            startTime: reservation.startTime,
            endDate: reservation.endDate,
            endTime: reservation.endTime
        }
        const formParams = qs.stringify(data);
        const uId = reservation.userEmail === "user@email.com" ? 1 : 4; // Just for testing..... Will get userId from state LoggedInUser (Session)
        
        return axios.post(`/api/rental/reservations`,formParams, {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'userId': uId,
                'locationId': reservation.locationId,
                'modelNames': reservation.modelNames,
                'promotion': reservation.promotion
            }
        })
    }
}

export default reservationsService;