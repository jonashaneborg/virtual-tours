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
                <div class="cell"></div>
                <div class="cell"></div>
                <div class="cell"></div>
                <div class="cell"></div>
              </div>

              <div v-for="tour in tours" :key="tour" class="row">
                <div class="cell">
                  {{ tour }}
                </div>
                <div class="cell"></div>
                <div class="cell"></div>
                <div class="cell"></div>
                <div class="cell">
                  <input
                    v-on:click="deleteTour(tour)"
                    type="image"
                    src="trash.png"
                    width="20"
                    height="20"
                  />
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
import * as firebase from "firebase/app";

export default {
  components: {},

  mounted: function () {
    this.fetchUsers();
    console.info("mounted, users:", this.users);
    this.fetchTours();
    console.info("mounted, tours:", this.tours);
  },
  data() {
    return {
      tours: [],
      users: [],
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    async fetchTours() {
      let storageRef = fb.storage.ref();
      let listRef = storageRef.child("Tours");
      let temp_tours = [];

      listRef
        .listAll()
        .then(function (res) {
          res.prefixes.forEach(function (folderRef) {
            let name = folderRef.name;

            // Check if folder is empty
            folderRef.listAll().then(function (ref) {
                console.log(ref.items.length);
                if (ref.items.length != 0) {
                  temp_tours.push(name);
                }
            });
            
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      this.tours = temp_tours;
    },
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
    async deleteTour(tour) {
      // Delete all items in folder
      let storageRef = fb.storage.ref();
      let folderRef = storageRef.child("Tours/" + tour);

      folderRef
        .listAll()
        .then(function (ref) {
          ref.items.forEach(function (fileRef) {
            // Delete file
            fileRef
              .delete()
              .then(function () {
                // File deleted successfully
              })
              .catch(function (error) {
                console.log(error);
              });
          });
        })
        .catch(function (error) {
          console.log(error);
          return;
        });

      // Delete all tour references in user-collection
      this.users.forEach(function (user) {
        fb.usersCollection.doc(user.id).update({
          tours: firebase.firestore.FieldValue.arrayRemove(tour),
        });
      });

      // Delete tour-document in tours-collection
      fb.toursCollection
        .doc(tour)
        .delete()
        .then(function () {
          console.log(tour + " successfully deleted.");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
