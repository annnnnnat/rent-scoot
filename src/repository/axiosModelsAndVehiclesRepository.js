import axios from '../custom-axios/axios'
import qs from 'qs'

const modelAndVehicleService = {
    fetchModels : () => {
        return axios.get("/api/rental/models")
    },
    fetchModelById : (modelId) => {
        return axios.get(`/api/rental/models/${modelId}`)
    },
    fetchAvailableVehicles : (locationId,dateStart,dateEnd,timeStart,timeEnd) => {
        const data = {
            startDate: dateStart,
            startTime: timeStart,
            endDate: dateEnd,
            endTime: timeEnd
        }
        const params = qs.stringify(data);
        return axios.get(`/api/rental/vehicles/${locationId}?${params}`)
    }
}

export default modelAndVehicleService;