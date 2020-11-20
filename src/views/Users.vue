<template>
  <section id="users" v-if="userProfile.admin">
	
	<div class="limiter">
		<div class="container-table100">
			<div class="wrap-table100">
					<div class="table">

						<div class="row header">
							<div class="cell">
								Name
							</div>
							<div class="cell">
								Company
							</div>
							<div class="cell">
								Admin
							</div>
              <div class="cell">
								Tours
							</div>
              <div class="cell">
								
							</div>
						</div>

						<div v-for="user in users" :key="user.id" class="row">
							<div class="cell">
								{{user.name}}
							</div>
							<div class="cell">
								{{user.company}}
							</div>
							<div class="cell">
								<label class="switch">
                  <input v-if="user.admin" type="checkbox" checked="true" @click="updateAdmin(user)">
                  <input v-else type="checkbox" @click="updateAdmin(user)">
                  <span class="slider round"></span>
                </label>
                </div>
              <div class="cell">
                
							</div> 
              <div class="cell">
                <input type="image" src="gear.png" width="20" height="20" >
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
  data() {
    return {
      users: [],
      tours: []
    };
  },
  mounted: function () {
    this.fetchUsers();
    this.fetchTours();
    console.info("mounted, users:", this.users);
    console.info("mounted, tours:", this.tours);
  },
  computed: {
    ...mapState(["userProfile", "users", "tours"]),
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

    updateProfile(user) {
      console.log(user.name);
      this.$store.dispatch('updateProfile', {
        admin: !user.admin
      })

      console.log("hey");
      this.showSuccess = true

      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    },
},
}
</script>

<style lang="scss" scoped>
</style>
