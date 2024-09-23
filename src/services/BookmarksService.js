import axios from "axios";

export function getBookmarks() {
  return axios.get(`http://localhost:5000/bookmarks`).then((data) => data.data);
}
export function getSingleBookmark(id) {
  return axios.get(`http://localhost:5000/bookmarks/${id}`).then((data) => data.data);
}
export function getGeolocationInfo(geolocaion) {
  return axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?${geolocaion}`).then((data) => data.data);
}

export function AddNewBookmark(newBookmark) {
  return axios.post('http://localhost:5000/bookmarks', newBookmark).then((data) => data.data);
}
export function deleteBookmark(deleteBookmark) {
  return axios.delete(`http://localhost:5000/bookmarks/${deleteBookmark}`).then((data) => data.data);
}
