<template>
  <nav class="topnav">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>
  </nav>
</template>

<style lang="scss">

// TODO: Responsive design

@use "@/assets/scss/mixins" as *;

// .topnav {
//   a {
//     color: $secondary-color;
//     text-decoration: none;
//     border: 5px solid $secondary-color;
//     padding: 10px 15px;
//   }

//   ul {
//     list-style-type: none;
//     padding: 0;
//   }

//   li {
//     display: inline;
//     margin-right: 10px;
//   }
// }
</style>
