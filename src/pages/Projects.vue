<template>
  <div>
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="(route, index) in routes" :key="index" :to="route.path">{{route.name}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <loader/>

    <v-card v-for="(project) in projects" :key="project.id">
      <v-card-title>
        <div>
          <h3>{{project.name}}</h3>
          <vue-markdown>{{ project.description }}</vue-markdown>
        </div>
      </v-card-title>

      <!-- <v-card-actions pa-0>
        <v-layout align-right>
          <v-flex xs12 text-xs-right>
            <v-btn flat>Abrir</v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions> -->
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VueMarkdown from "vue-markdown";
import Loader from '../components/Loader';

export default {
  name: "projects",
  components: {
    VueMarkdown,
    Loader
  },
  computed: mapState({
    title: state => state.app.title,
    routes: state => state.app.routes,
    projects: state => state.gitlab.projects
  }),
  created() {
    this.$store.commit('title', 'Projects')
    // this.$store.dispatch("getProjects");
  }
};
</script>
