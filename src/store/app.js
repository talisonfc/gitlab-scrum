
/**
 * Store gerais da aplicacao
 */
export default {
  state: {
    title: "Issues",
    routes: [
      {
        name: "Grupos",
        path: "/groups"
      },
      {
        name: "Projetos",
        path: "/projects"
      },

      {
        name: "Issues",
        path: "/issues"
      }
    ]
  },
  mutations: {
    title: (state, title)=>{
      state.title = title
    }
  }
};
