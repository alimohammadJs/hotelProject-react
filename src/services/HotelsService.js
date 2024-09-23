import axios from "axios";

export function getHotel() {
  return axios.get("http://localhost:5000/hotels").then((data) => data.data);
}
export function getFilterHotel(queryString) {
  return axios
    .get(`http://localhost:5000/hotels?${queryString}`)
    .then((data) => data.data);
}
export function getSingleHotel(id) {
  return axios
    .get(`http://localhost:5000/hotels/${id}`)
    .then((data) => data.data);
}
