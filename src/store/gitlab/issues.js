import http from "../../http";

const STATS = {
  qtn: {
    Historias: 0,
    Doing: 0,
    Done: 0,
    Issues: 0,
    all: {
      Done: 0,
      Doing: 0
    }
  }
};

const state = {
  boards: [],
  issues: [],
  historiasDoUsuario: [],
  stats: {...STATS},
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
  historiasDoUsuario(state, historias) {
    state.historiasDoUsuario = historias;
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
  getHistoriasDoUsuario({ commit, state, rootState }) {
    const options = {
      labels: "Sprint backlog, Histórias dos usuários",
      state: "opened"
    };
    http
      .get(`/projects/${rootState.projects.currentProject.id}/issues`, options)
      .then(res => {
        let historias = {};
        state.stats.qtn.Historias = res.data.length;
        res.data.forEach(historia => {
          historias[historia.iid] = { ...historia, issues: [] };
        });
        commit("historiasDoUsuario", historias);
      })
      .catch(() => {});
  },
  loadIssuesToHistorias({ state, rootState }, options) {
    http
      .get(`/projects/${rootState.projects.currentProject.id}/issues`, options)
      .then(res => {
        const issues = res.data;
        state.stats.qtn.Issues += issues.length;
        state.stats.qtn.all[options.labels] += issues.length;

        const regex = /(#)\w+/;
        issues.forEach(issue => {
          const result = regex.exec(issue.title);
          if (result) {
            const historiaId = result[0].replace("#", "");
            state.historiasDoUsuario[historiaId].issues.push({
              ...issue,
              color: options.labels === "Doing" ? "red" : "blue"
            });
            if (!state.historiasDoUsuario[historiaId].qtn)
              state.historiasDoUsuario[historiaId].qtn = { Doing: 0, Done: 0 };
            state.historiasDoUsuario[historiaId].qtn[options.labels]++;
            // stats sprint
            state.stats.qtn[options.labels]++;
          }
        });
      })
      .catch(() => {});
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
