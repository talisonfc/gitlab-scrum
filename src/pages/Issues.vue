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

    <v-card v-if="board">
      <v-card-text>
        <Label v-for="list in board.lists" :key="list.id" :value="list.label"/>
      </v-card-text>
    </v-card>

    <v-card v-for="(issue,index) in issues" :key="issue.id">
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
        <v-layout align-right>
          <v-flex xs12 text-xs-right>
            <v-btn flat @click="open(index)">Abrir</v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import Author from "../components/Author";
import { mapState, mapMutations } from 'vuex'
import Label from "../components/Label"

export default {
  name: "issues",
  components: {
    VueMarkdown,
    Author,
    Label
  },
  computed: mapState({
    title: state => state.app.title,
    routes: state => state.app.routes,
    board: state => state.issues.boards[0],
    issues: state => state.issues.issues
  }),
  methods: {
    open(index) {
      this.currentIssue(index);
      this.$router.push("/issue");
    },
    ...mapMutations([
      'currentIssue'
    ])
  },
  created(){
    this.$store.commit('title', 'Issues')
    this.$store.dispatch("getBoards")
    this.$store.dispatch("getIssues");
  }
};
</script>
