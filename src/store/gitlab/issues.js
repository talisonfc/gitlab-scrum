import http from "../../http";

const state = {
  boards: [],
  issues: [],
  currentIssue: {},
  labels: [],
  loading: false
};

const mutations = {
  boards(state, boards) {
    state.boards = boards;
  },
  issues(state, issues) {
    state.issues = issues;
  },
  labels(state, labels) {
    state.labels = labels;
  },
  currentIssue(state, index) {
    state.currentIssue = state.issues[index];
  },
  addSpentTimeToCurrentIssue(state, time_stats) {
    state.currentIssue.time_stats = time_stats;
  },
  loadingOn(state) {
    state.loading = true;
  },
  loadingOff(state) {
    state.loading = false;
  }
};

const getters = {
  getLabel: state => name => {
    return state.labels.find(label => label.name === name);
  },
  getCurrentIssue: state => {
    return state.currentIssue;
  }
};

const actions = {
  getBoards({ commit, rootState }) {
    http
      .get(`/projects/${rootState.projects.currentProject.id}/boards`)
      .then(res => {
        commit("boards", res.data);
      })
      .catch(() => {});
  },
  getIssues({ commit, rootState }, options) {
    commit("loadingOn");
    http
      .get(`/projects/${rootState.projects.currentProject.id}/issues`, options)
      .then(res => {
        commit("issues", res.data);
        commit("loadingOff");
      })
      .catch(() => {
        commit("loadingOff");
      });
  },
  getLabels({ commit, rootState }) {
    commit("loadingOn");
    http
      .get(`/projects/${rootState.projects.currentProject.id}/labels`)
      .then(res => {
        commit("labels", res.data);
        commit("loadingOff");
      })
      .catch(() => {
        commit("loadingOff");
      });
  },
  addSpentTime({ commit, rootState, state }, timeSpent) {
    const issue_iid = state.currentIssue.iid;
    commit("loadingOn");
    http
      .post(
        `/projects/${
          rootState.projects.currentProject.id
        }/issues/${issue_iid}/add_spent_time`,
        {
          duration: timeSpent
        }
      )
      .then(res => {
        commit("addSpentTimeToCurrentIssue", res.data);
        commit("loadingOff");
      })
      .catch(() => {
        commit("loadingOff");
      });
  }
};

/**
 * Store com dados do gitlab
 */
export default {
  state,
  mutations,
  getters,
  actions
};
