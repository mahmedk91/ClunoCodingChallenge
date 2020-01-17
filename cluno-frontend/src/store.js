import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
  state: {
    offers: [],
    offer: {}
  },

  getters: {
    getOffers: state => {
      return state.offers;
    },
    getOffer: state => {
      return state.offer;
    }
  },

  mutations: {
    setOffers(state, offers) {
      state.offers = offers;
    },
    setOffer(state, offer) {
      state.offer = offer;
    }
  },

  actions: {
    async loadOffers(context) {
      await axios.get("http://localhost:3000/offers").then(response => {
        if (response.data) {
          context.commit("setOffers", response.data);
        }
      });
    },
    async loadOffer(context, id) {
      await axios.get("http://localhost:3000/offers/" + id).then(response => {
        if (response.data) {
          context.commit("setOffer", response.data);
        }
      });
    }
  }
});

export default store;
