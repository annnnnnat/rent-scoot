import axiosCustom from "../custom-axios/axios";
//import qs from 'qs'
let port = "";
const LocationsService = {
  fetchLocations: () => {
    return axiosCustom.get("/api/rental/locations");
  },
  searchLocation: (term) => {
    return axiosCustom.get(`/api/rental/locations?term=${term}`);
  },
  fetchPrices: () => {
    return axiosCustom.get(
      `http://${process.env.REACT_APP_BACKEND_IP}:${port}`
    );
  },
};

export default LocationsService;
