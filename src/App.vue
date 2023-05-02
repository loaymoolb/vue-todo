<script setup>
import TodoView from "./views/TodoView.vue";
</script>

<template>
  <TodoView />
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Asap:wght@300;400;500;700&display=swap");

* {
  font-family: "Asap", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
}

.container {
  min-width: 1100px;
  margin: 0 auto;
}
</style>
