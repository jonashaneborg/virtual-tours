<template>
  <section id="settings">
    <div class="col1">
      <h3>Settings</h3>
      <p>Update your profile</p>

      <transition name="fade">
        <p v-if="showSuccess" class="success">profile updated</p>
      </transition>

      <form @submit.prevent>
        <label for="name">Name</label>
        <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name" />

        <label for="company">Company</label>
        <input v-model.trim="company" type="text" :placeholder="userProfile.company" id="company" />

        <button @click="updateProfile()" class="button">Update Profile</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      name: '',
      company: '',
      admin: '',
      showSuccess: false
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateProfile', {
        name: this.name !== '' ? this.name : this.userProfile.name,
        company: this.company !== '' ? this.company : this.userProfile.company,
      })

      this.name = ''
      this.company = ''
      this.admin = ''

      this.showSuccess = true

      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    }
  }
}
</script>
