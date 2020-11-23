<template>
  <section v-if="userProfile.admin" id="webgl">
     <!-- <unity
      src="Build/AngryJarleWebGL.json"
      width="1000"
      height="600"
      unityLoader="Build/UnityLoader.js"
      ref="myInstance"
    >  
    </unity> -->
    <button @click="fetchFiles()">Press me</button>
  </section>
</template>


<script>
//import Unity from "vue-unity-webgl";
import { mapState } from "vuex";
import * as firebase from "firebase/app";

export default {
  // components: { Unity },
  data() {
    return {
      files: [],
    };
  },
  computed: {
    ...mapState(["userProfile", "files"]),
    items: function () {
      return this.files;
    },
  },
  methods: {
    async fetchFiles() {
      var storageRef = firebase.storage().ref("WebGl-test");
      print(storageRef);
      
      storageRef
        .listAll()
        .then(function (result) {
          result.items.forEach(function (fileRef) {
            print(fileRef);
          });
        })
        .catch(function (error) {
          throw new Error("Something went wrong: " + error);
        });
    },
  },
};
</script>


<style>
</style>
