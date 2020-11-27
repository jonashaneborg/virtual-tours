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
                <input
                  v-on:click="openModal(user)"
                  type="image"
                  src="gear.png"
                  width="20"
                  height="20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit tours overlay -->
    <div
      v-if="modalVisible"
      class="edit-tours"
      @click.self="modalVisible = false"
    >
      <div class="edit-content" id="edit-tours">
        <div class="limiter">
          <div class="container-table100">
            <div class="wrap-table100">
              <div class="table">
                <div class="row header">
                  <div class="cell">{{ currUser.name }}'s tours</div>
                  <div class="cell">Access</div>
                </div>

                <div
                  v-for="[name, access] in currTours"
                  :key="name"
                  class="row"
                >
                  <div class="cell">
                    {{ name }}
                  </div>
                  <div class="cell">
                    <label class="switch">
                      <input
                        v-if="access"
                        type="checkbox"
                        checked="true"
                        v-on:click="updateTour(currUser, [name, access])"
                      />
                      <input
                        v-else
                        type="checkbox"
                        v-on:click="updateTour(currUser, [name, access])"
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
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
import * as firebase from "firebase/app";

export default {
  components: {},
  data() {
    return {
      users: [],
      tours: [],
      modalVisible: false,
      currTours: [],
      currUser: null,
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
          data["tours"].sort();
          return { id, ...data };
        });

        console.log("Loaded users", this.users);
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },

    async fetchTours() {
      let storageRef = fb.storage.ref();
      let listRef = storageRef.child("Tours");
      let temp_tours = [];

      listRef
        .listAll()
        .then(function (res) {
          res.prefixes.forEach(function (folderRef) {
            let name = folderRef.name;
            temp_tours.push(name);
          });
        })
        .catch(function (error) {
          console.log(error);
        });

        this.tours = temp_tours;
    },

    async updateAdmin(user) {
      try {
        fb.usersCollection.doc(user.id).update({ admin: !user.admin });
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },

    async updateTour(user, tour) {
      try {
        let [name, access] = tour;
        // Delete tour
        if (access) {
          fb.usersCollection
            .doc(user.id)
            .update({ tours: firebase.firestore.FieldValue.arrayRemove(name) });
        }
        // Add tour
        else {
          fb.usersCollection
            .doc(user.id)
            .update({ tours: firebase.firestore.FieldValue.arrayUnion(name) });
        }
      } catch (error) {
        throw new Error("Something went wrong: \n" + error);
      }
    },

    openModal(user) {
      var all_tours = [];
      var user_tours = user.tours;

      this.tours.forEach(function (tour) {
        if (user_tours.includes(tour)) {
          all_tours.push([tour, true]);
        } else {
          all_tours.push([tour, false]);
        }
      });

      all_tours.sort();
      this.currTours = all_tours;
      this.currUser = user;
      this.modalVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
