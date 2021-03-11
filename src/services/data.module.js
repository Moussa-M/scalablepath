import DataService from './data.service';

const profile = JSON.parse(localStorage.getItem('profile')) || null;
const products = JSON.parse(localStorage.getItem('products')) || [];
const initialState = { products: products,profile:profile };

export const data = {
  namespaced: true,
  state: initialState,
  actions: {
    
    getProfile({ commit }) {
      return DataService.getProfile().then(
        response => {
          commit('setProfile',response.data);
          return Promise.resolve(response.data);
        
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getProducts({ commit }) {
      return DataService.getProducts().then(
        response => {
          commit('setProducts',response.data);
          return Promise.resolve(response.data);
        
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    updateProduct({ commit },product) {
      return DataService.updateProduct(product).then(
        response => {
          commit('updateProduct',response.data);
          return Promise.resolve(response.data);
        
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    addProduct({ commit }, product) {
      return DataService.addProduct(product).then(
        response => {
          commit('addProduct',response.data);
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    removeProduct({ commit }, productId) {
      return DataService.removeProduct(productId).then(
        response => {
          commit('removeProduct',productId);
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
    
  },
  mutations: {
    setProfile(state,profile) {
      state.profile = profile;
      localStorage.setItem("profile", JSON.stringify(profile))
    },
    setProducts(state,products) {
      state.products = products;
      localStorage.setItem("products", JSON.stringify(products))
    },
    addProduct(state,product) {
      state.products.push(product);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    updateProduct(state,product) {
      var index = state.products.map(function(product) { return product.id; }).indexOf(product.id);
      state.products.splice(index, 1,product);
    },
    removeProduct(state,productId) {
      var removeIndex = state.products.map(function(product) { return product.id; }).indexOf(productId);
      state.products.splice(removeIndex, 1);
    }
  }
};