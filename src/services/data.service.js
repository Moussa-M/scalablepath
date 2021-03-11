import axios from 'axios';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
const API_URL = 'http://localhost:8000/api/';

function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.access) {
    return { Authorization: 'Bearer ' + user.access };
  } else {
    return {};
  }
}

class DataService {

  async getProfile() {
    return axios.get(API_URL + 'users/profile/', { headers: authHeader() });
  }

  async addProduct(product) {
    return axios.post(API_URL + 'products/',product, { headers: authHeader() });
  }
  async updateProduct(product) {
    return axios.patch(API_URL + `products/${product.id}/`,product, { headers: authHeader() });
  }
  async getProducts() {
    return axios.get(API_URL + 'products/', { headers: authHeader() });
  }
  removeProduct(productId) {
    return axios.get(API_URL + `products/${productId}/delete/`, { headers: authHeader() });
  }
}

export default new DataService();