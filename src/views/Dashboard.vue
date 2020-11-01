<template>
<section id="dashboard">
  <div id="Dashboard">
    <div class="col1">
    
    <h1 v-if="userProfile.admin">All tours</h1>
    <h1 v-else>My tours</h1>
    </div>
    
  </div>
</section>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  components: {
  
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    
  },
  filters: {
    formatDate(val) {
      if (!val) { return '-' }

      let date = val.toDate()
      return moment(date).fromNow()
    },
    trimLength(val) {
      if (val.length < 200) { return val }
      return `${val.substring(0, 200)}...`
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
