<script setup>
import Header from "./components/Header.vue";
import Content from "./components/Content.vue";
import { useConnectionStore } from "./store";

const connection = useConnectionStore();
</script>

<template>
  <div class="container">
    <Header />
    <Content v-if="connection.connected" />
  </div>
</template>

<style lang="scss">
.container {
  width: 96%;
  max-width: 1300px;
  margin: 0 auto;
  min-height: 100vh;
  padding-bottom: 4rem;
}
</style>
