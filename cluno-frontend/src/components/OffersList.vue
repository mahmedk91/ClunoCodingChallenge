<template>
  <div class="container">
    <h1>Cluno car subscriptions</h1>
    <hr />

    <!-- Filtering and sorting options -->
    <div class="row justify-content-end">
      <div class="col-sm-4">
        <span>Filter by Price:</span>
        <vue-slider
          v-model="filterPriceValue"
          v-bind:enable-cross="false"
          v-bind:silent="true"
          v-bind:min="minPrice"
          v-bind:max="maxPrice"
          v-on:change="applyFilterAndSort()"
        />
      </div>
      <div class="col-sm-1">
        <span>Sort by Price:</span>
        <toggle-button
          v-model="sortPriceToggle"
          v-on:change="applyFilterAndSort()"
          v-bind:color="{
            checked: '#9cd5ff',
            unchecked: '#9cd5ff'
          }"
          v-bind:labels="{ checked: 'Min', unchecked: 'Max' }"
        />
      </div>
    </div>
    <hr />

    <!-- Offer list -->
    <div class="row">
      <div v-for="offer in offers" v-bind:key="offer.id" class="col-sm-4">
        <b-card
          v-bind:title="offer.teaser.title"
          v-bind:img-src="offer.teaser.teaserImage"
          img-top
          class="mb-2"
        >
          <b-card-text>
            <p><strong>Price: </strong>{{ offer.pricing.price }}/month</p>
          </b-card-text>
          <b-button v-bind:href="'offer/' + offer.id" variant="primary"
            >Details</b-button
          >
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import VueSlider from "vue-slider-component";
import { ToggleButton } from "vue-js-toggle-button";

import { BCard, BCardText, BButton } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-slider-component/theme/antd.css";

export default {
  name: "OfferList",
  components: {
    VueSlider,
    ToggleButton,
    BCard,
    BCardText,
    BButton
  },
  data() {
    return {
      offers: [], // list of offers displayed on page
      sortPriceToggle: true, // toggle to sort offers by price. true -> ASC, false -> DESC
      filterPriceValue: [0, 0], // selected range of price filter
      minPrice: 0, // min range value of price filter upto which min price could be selected
      maxPrice: 0 // max range value of price filter upto which max price could be selected
    };
  },
  methods: {
    applyFilterAndSort() {
      // Get all offers
      this.offers = store.getters["getOffers"];

      // filter offers according to price filter
      this.offers = this.offers.filter(
        offer =>
          offer.pricing.price >= this.filterPriceValue[0] &&
          offer.pricing.price <= this.filterPriceValue[1]
      );

      // sort offers according to price sort toggle
      this.offer = this.offers.sort((a, b) => {
        if (a.pricing.price > b.pricing.price) {
          return this.sortPriceToggle ? 1 : -1;
        }

        if (a.pricing.price < b.pricing.price) {
          return this.sortPriceToggle ? -1 : 1;
        }

        return 0;
      });
    }
  },
  async beforeMount() {
    // Load offers from backend only once at page load
    await store.dispatch("loadOffers").then(() => {
      this.offers = store.getters["getOffers"];

      // Set initial value for price filter
      if (this.offers) {
        this.minPrice = this.offers[0].pricing.price;
        this.maxPrice = this.offers[this.offers.length - 1].pricing.price;
        this.filterPriceValue = [this.minPrice, this.maxPrice];
      }
    });
  }
};
</script>

<style></style>
