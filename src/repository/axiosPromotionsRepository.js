import axiosCustom from '../custom-axios/axios'
//import qs from 'qs'

const PromotionsService = {
    fetchPromotions : () => {
        return axiosCustom.get("/api/rental/promotions");
    }
}

export default PromotionsService;