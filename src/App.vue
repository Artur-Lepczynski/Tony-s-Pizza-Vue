<template>
  <!-- header here -->
  <TheHeader/>
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/header/TheHeader.vue'

export default {
  components: {
    TheHeader
  }, 
  created(){
    this.$store.dispatch('tryLogin');
  }
  
}
</script>

<style>
:root{
  --bg1: #ffffff;
  --bg2: #f9f9f9;
  --bg3: #edeff2; 
  --bg4: #dadee1; 
  --bg5: #38434f;

  --primary-accent1: #3177b3; 
  --primary-accent2: #2b6ca3; 
  --primary-accent3: #245885;

  --secondary-accent1: #e3e4e8;
  --secondary-accent2: #c5cad5;
  --secondary-accent3: #c6cbd7;

  --primary-text1:black; 

  --secondary-text1: #dadada;
  --secondary-text2: #455a63;

  --primary-text-error1: #a20000;

  --primary-animation-duration: 150ms; 







  --background-light1: rgb(240, 246, 206);
  --background-dark1: rgb(59, 59, 59);

  --card-background-light1: rgb(226, 231, 196);

  --button-green-1: rgb(89, 190, 94);
  --button-green-1-hover: rgb(46, 122, 50);

  --button-light-1-hover: rgb(219, 226, 178);


  --header-height: 100px;
}

body{
  margin: 0;
}


#app {
  font-family: Lato, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}


</style>
