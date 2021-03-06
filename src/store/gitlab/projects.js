import http from "../../http";

const state = {
  projects: [],
  currentProject: {}
};

const mutations = {
  projects(state, projects) {
    state.projects = projects;
  },
  project(state, project){
    state.projects.push(project)
  },
  currentProject(state, project){
    state.currentProject = project
  }
};

const getters = {};

const actions = {
  getProjects({ commit }) {
    http
      .get("/projects")
      .then(res => {
        commit("projects", res.data);
      })
      .catch(() => {});
  },
  getProject({ commit }, projectId){
    http
      .get(`/projects/${projectId}`)
      .then(res => {
        commit("project", res.data);
      })
      .catch(() => {});
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
