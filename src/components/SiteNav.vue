<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="/">
          <h3>Virtual Tour</h3>
        </router-link>
        <ul class="inline">
          <li>
            <router-link v-if="userProfile.admin" to="/users">Users</router-link>
          </li>
          <li>
            <router-link to="/">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/settings">Settings</router-link>
          </li>
          <li><a @click="logout()">Logout</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
import { users } from '@/firebase'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
