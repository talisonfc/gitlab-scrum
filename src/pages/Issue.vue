<template>
  <div>
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="(route, index) in routes" :key="index">{{route.name}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <stopwatch/>
    <v-card>
      <v-card-title>
        <div>
          <h3>{{issue.title}}</h3>
          <vue-markdown>{{ issue.description }}</vue-markdown>
        </div>
      </v-card-title>

      <v-card-text>
        <author v-bind:author="issue.author"/>
      </v-card-text>

      <v-card-actions pa-0>
        <v-layout align-left>
          <v-flex xs12 text-xs-left>
            <v-chip block color="white" text-color="dark">#{{issue.iid}}</v-chip>
            <v-chip
              small
              v-for="(label, index) in issue.labels "
              :key="index"
              color="primary"
              outline
            >{{label}}</v-chip>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>

    <v-footer app>
      <v-layout align-right>
        <v-flex xs12 text-xs-right>
          <v-btn @click="back" block color="primary">Voltar</v-btn>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import Author from "../components/Author";
import Stopwatch from "../components/Stopwatch";
import { mapState } from 'vuex';

export default {
  name: "Issue",
  computed: mapState({
    issue: state => state.issues.currentIssue,
    title: state => state.app.title,
    routes: state => state.app.routes
  }),
  components: {
    VueMarkdown,
    Author,
    Stopwatch
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  created(){
    this.$store.commit('title', 'Issue')
  }
};
</script>