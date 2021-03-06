import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
const API_URL = "http://localhost:8000/api/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "token/", {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.access) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "users/", {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
