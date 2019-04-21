<template>
  <v-layout align-center row spacer>
    <v-flex xs2>
      <v-avatar size="36px">
        <img v-if="author.avatar_url" :src="author.avatar_url" alt="Avatar">
      </v-avatar>
    </v-flex>

    <v-flex xs5>
      <span>{{author.name}}</span>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  name: "Author",
  props: ["author"]
};
</script>
