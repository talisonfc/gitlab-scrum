import Vue from "vue";
import Vuex from "vuex";

import app from './app'
import issues from './gitlab/issues'
import projects from './gitlab/projects'

Vue.use(Vuex);

/**
 * Store principal
 */
export default new Vuex.Store({
  modules: {
    app,
    issues,
    projects
  }
});
