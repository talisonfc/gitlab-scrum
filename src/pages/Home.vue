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

    <v-card>
      <v-card-text>
        <v-form @submit.prevent="save">
          <v-text-field v-model="projectId" label="ID do Projeto" required></v-text-field>

          <v-btn color="error">Reset</v-btn>
          <v-btn color="success" type="submit">Save</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card v-for="(project, index) in projects" :key="project.id" @click="open(index)">
      <v-card-title primary-title>
        <div>
          <h3 class="mb-0">{{project.name_with_namespace}}</h3>
          <div>{{project.description}}</div>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {
      projectId: ""
    };
  },
  computed: mapState({
    title: state => state.app.title,
    routes: state => state.app.routes,
    projects: state => state.projects.projects
  }),
  methods: {
    save() {
      this.$store.dispatch("getProject", this.projectId);
    },
    open(index){
      this.$store.commit("currentProject", this.projects[index])
      this.$router.push("/issues");
    }
  },
  created() {
    this.$store.commit("title", "Home");
  }
};
</script>
