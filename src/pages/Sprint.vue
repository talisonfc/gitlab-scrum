<template>
  <div>
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title @click="home">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="(route, index) in routes" :key="index" :to="route.path">{{route.name}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-card>
      <v-card-title>Estatisticas da sprint</v-card-title>

      <v-card-text>
        <chip title="QTN Historias" :content="stats.qtn.Historias"/>
        <chip title="QTN Issues" :content="stats.qtn.Issues"/>
        <chip title="QTN Doing" :content="stats.qtn.Doing"/>
        <chip title="QTN Done" :content="stats.qtn.Done"/>
        <chip title="QTN All Doing" :content="stats.qtn.all.Doing"/>
        <chip title="QTN All Done" :content="stats.qtn.all.Done"/>
      </v-card-text>
    </v-card>

    <v-card v-for="historia in historiasDoUsuario" :key="historia.id">
      <v-card-title>
        <v-layout>
          <v-flex xs6>
            <h3>
              #{{historia.iid}} - {{historia.title}}
              <a :href="historia.web_url" target="_blank">Abrir</a>
            </h3>
            <div v-if="historia.issues.length">
              <chip title="QTN Issues" :content="historia.issues.length"/>
              <chip title="QTN Doing" :content="historia.qtn['Doing']"/>
              <chip title="QTN Done" :content="historia.qtn['Done']"/>
              <chip
                title="Doing (%)"
                :content="`${100*historia.qtn['Doing']/historia.issues.length}%`"
              />
              <chip
                title="Done (%)"
                :content="`${100*historia.qtn['Done']/historia.issues.length}%`"
              />
            </div>
          </v-flex>
          <v-flex xs6>
            <v-card v-for="(issue, is) in historia.issues" :key="'issue'+is" :color="issue.color">
              <v-card-text>{{issue.title}}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import chip from "../components/chip";

export default {
  name: "Spring",
  components: {
    chip
  },
  computed: mapState({
    title: state => state.app.title,
    routes: state => state.app.routes,
    historiasDoUsuario: state => state.issues.historiasDoUsuario,
    issues: state => state.issues.issues,
    stats: state => state.issues.stats
  }),
  methods: {
    home() {
      this.$router.push("/");
    }
  },
  created() {
    this.$store.commit("title", "Sprint");
    this.$store.dispatch("getHistoriasDoUsuario");
    this.$store.dispatch("loadIssuesToHistorias", { labels: "Doing" });
    this.$store.dispatch("loadIssuesToHistorias", { labels: "Done" });
  }
};
</script>

<style>
</style>
