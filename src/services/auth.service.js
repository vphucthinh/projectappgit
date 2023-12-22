import axios from "axios";

const API_URL = "http://localhost:3000/api/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      name: username,
      email,
      password,
    });
  }
}

export default new AuthService();
