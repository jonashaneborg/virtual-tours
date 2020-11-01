<template lang="en-us">

      
    <div class="webgl-content">
      <div id="unityContainer" style="width: 960px; height: 600px"></div>
      <div class="footer">
        <div class="webgl-logo"></div>
        <div class="fullscreen" onclick="unityInstance.SetFullscreen(1)"></div>
        <div class="title">Angry Jarle</div>
      </div>
    </div>
  
</template>



<script>

import UnityProgress from "/TemplateData/UnityProgress.js"
import UnityLoader from "/Build/UnityLoader.js"

var unityInstance = UnityLoader.instantiate("unityContainer", "Build/AngryJarleWebGL.json", {onProgress: UnityProgress})

export default {
    mounted: {}
        

    
}
</script>
