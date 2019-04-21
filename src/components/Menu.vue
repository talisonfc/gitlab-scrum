<template>
  <div>
    <ion-toolbar color="primary">
      <ion-title>{{title}}</ion-title>
    </ion-toolbar>
  </div>
  <!-- <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-for="(route, index) in routes" :key="index" :to="route.path">{{route.name}}</v-btn>
    </v-toolbar-items>
  </v-toolbar> -->
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "menu",
  computed: mapState({
    title: state => state.app.title,
    routes: state => state.app.routes
  })
};
</script>
