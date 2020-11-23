<template>
  <section id="dashboard">
    <div v-if="userProfile.admin" class="col1">
      <h1>All tours</h1>
      <div class="limiter">
        <div class="container-table100">
          <div class="wrap-table100">
            <div class="table">
              <div class="row header">
                <div class="cell">Name</div>
              </div>

              <div v-for="tour in tours" :key="tour.id" class="row">
                <div class="cell">
                  {{ tour.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <h1>My tours</h1>
      <div class="limiter">
        <div class="container-table100">
          <div class="wrap-table100">
            <div class="table">
              <div class="row header">
                <div class="cell">Name</div>
              </div>

              <div v-for="tour in userProfile['tours']" :key="tour" class="row">
                <div class="cell">
                  {{ tour }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import * as fb from "../firebase";

export default {
  components: {},

  mounted: function () {
    this.fetchTours();
  },
  data() {
    return {
      tours: [],
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    async fetchTours() {
      try {
        const { docs } = await fb.toursCollection.get();
        console.log(this.userProfile.admin);

        this.tours = docs.map((doc) => {
          const { id } = doc;
          const data = doc.data();
          console.log(data);
          return { id, ...data };
        });

        console.log("Loaded tours", this.tours);
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
