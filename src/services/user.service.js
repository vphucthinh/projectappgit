import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/";

class UserService {
  getPublicContent() {
    console.log(authHeader());
    return axios.get(API_URL + "profile", { headers: authHeader() });
  }

  saveMyCarts(listcart) {
    return axios.post(API_URL + "cart", { listcart: listcart }, { headers: authHeader() });
  }

  getMyCarts() {
    return axios.get(API_URL + "cart", { headers: authHeader() });
  }

}

export default new UserService();
