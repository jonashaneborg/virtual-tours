<!--
Due Firebase SDK not being compatible with a WebGL build, we did not get to implement
the tour creator in this web application. The code below however, works for running
WebGL applications. 
-->

<template>
  <section v-if="userProfile.admin" id="webgl">
     <!-- 
      <unity
      src="Build/WebGLfile.json"
      width="1000"
      height="600"
      unityLoader="Build/UnityLoader.js"
      ref="myInstance"
    >  
    </unity> 
    -->
    <button @click="fetchFiles()">Press me</button>
  </section>
</template>


<script>
//import Unity from "vue-unity-webgl";
import { mapState } from "vuex";
//import * as firebase from "firebase/app";

export default {
  // components: { Unity },
  data() {
    return {

    };
  },
  computed: {
    ...mapState(["userProfile"]),
    
  },
  methods: {
    
  },
};
</script>


<style>
</style>
