<template>
  <div v-if="offer">
    <h1>{{ offer.teaser.title }}</h1>
    <img v-bind:src="offer.teaser.teaserImage" />
    <hr />

    <h3>Car Details</h3>
    <p><strong>Fuel Type: </strong>{{ offer.car.fueltype }}</p>
    <p><strong>Gearing Type: </strong>{{ offer.car.gearingType }}</p>
    <p><strong>Doors: </strong>{{ offer.car.doors }}</p>
    <p><strong>Drive: </strong>{{ offer.car.drive }}</p>
    <hr />

    <h3>Pricing</h3>
    <p><strong>Price: </strong>{{ offer.pricing.price }}/month</p>
    <hr />

    <h3>Equipments</h3>
    <div
      v-for="equipment in offer.car.equipmentDetails"
      v-bind:key="equipment.name"
    >
      <p>{{ equipment.name }}</p>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "OfferDetails",
  data() {
    return {
      offer: null
    };
  },
  async beforeMount() {
    await store.dispatch("loadOffer", this.$route.params.id).then(() => {
      this.offer = store.getters["getOffer"];
    });
  }
};
</script>
