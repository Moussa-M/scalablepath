import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from '../services/auth.module';
import { data } from '../services/data.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,data
  }
});