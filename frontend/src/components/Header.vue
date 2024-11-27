<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <header class="header">
    <h1>Task Master</h1>
    <Navbar />
    <button id="profile-button" class="user-profile-icon">
      <img src="/images/profile-user.png" alt="User Profile" />
    </button>
  </header>
</template>

<style lang="scss">
// header {
//   background-color: $primary-color;
//   color: $secondary-color;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   height: 50px;
//   padding: 10px;

//   .user-profile-icon img {
//     display: block;
//     width: 100%;
//     height: auto;
//   }

//   #profile-button {
//     width: 50px;
//     height: 50px;
//   }
// }
</style>
