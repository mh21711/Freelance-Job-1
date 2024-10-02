<script setup>
import { RouterLink } from "vue-router";
import TheFooter from "../components/TheFooter.vue";
</script>
<template>
  <section class="text-center container-fluid">
    <img src="/images/not-found.svg" alt="notfound image" />
    <div class="mt-5">
      <p>عذرا هذه الصفحة غير متوفرة <RouterLink to="/">الرئيسية</RouterLink></p>
    </div>
  </section>
  <TheFooter class="bg-black" />
</template>

<style scoped>
section img {
  width: 100%;
  height: 70vh;
}
p {
  font-size: 20px;
}
a {
  text-decoration: none;
  color: #f5972c;
}
</style>
