<template>
  <section id="users" v-if="userProfile.admin">
    <div class="limiter">
      <div class="container-table100">
        <div class="wrap-table100">
          <div class="table">
            <div class="row header">
              <div class="cell">Name</div>
              <div class="cell">Company</div>
              <div class="cell">Admin</div>
              <div class="cell">Tours</div>
              <div class="cell"></div>
            </div>

            <div v-for="user in users" :key="user.id" class="row">
              <div class="cell">
                {{ user.name }}
              </div>
              <div class="cell">
                {{ user.company }}
              </div>
              <div class="cell">
                <label class="switch">
                  <input
                    v-if="user.admin"
                    type="checkbox"
                    checked="true"
                    v-on:click="updateAdmin(user)"
                  />
                  <input
                    v-else
                    type="checkbox"
                    v-on:click="updateAdmin(user)"
                  />
                  <span class="slider round"></span>
                </label>
              </div>
              <div class="cell">
                <div
                  v-for="tour in user['tours']"
                  :key="tour"
                  class="tour-list"
                >
                  <ul>
                    <li>{{ tour }}</li>
                  </ul>
                </div>
              </div>
              <div class="cell">
                <input v-on:click="showModal = true" type="image" src="gear.png" width="20" height="20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit window -->
    
  </section>
</template>

<script>
import { mapState } from "vuex";
import * as fb from "../firebase";

export default {
  components: {
    
  },
  data() {
    return {
      users: [],
      tours: [],
      showModal: true
    };
  },
  mounted: function () {
    this.fetchUsers();
    console.info("mounted, users:", this.users);
    this.fetchTours();
    console.info("mounted, tours:", this.tours);
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    async fetchUsers() {
      try {
        const { docs } = await fb.usersCollection.get();

        this.users = docs.map((doc) => {
          const { id } = doc;
          const data = doc.data();
          return { id, ...data };
        });

        console.log("Loaded users", this.users);
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
   
    async fetchTours() {
      try {
        const { docs } = await fb.toursCollection.get();

        this.tours = docs.map((doc) => {
          const { id } = doc;
          const data = doc.data();
          return { id, ...data };
        });

        console.log("Loaded tours", this.tours);
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },

    async updateAdmin(user) {
      try {
        fb.usersCollection.doc(user.id).update({ admin: !user.admin });
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
  },
};

</script>

<style lang="scss" scoped>
</style>
