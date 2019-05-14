<template>
  <div class="chip pa-1 ml-1 mr-1">
    <div class="chip-content">{{content}}</div>
    <div class="chip-title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "chip",
  props: ['title', 'content']
};
</script>

<style scoped>
.chip {
  display: inline-block;
  flex-direction: column;
}

.chip-title {
  font-size: 0.8em;
  color: #888;
  text-align: center;
}

.chip-content {
  text-align: center;
}
</style>
