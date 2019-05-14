
/**
 * Store gerais da aplicacao
 */
export default {
  state: {
    title: "Issues",
    routes: [
      {
        name: "Issues",
        path: "/issues"
      },
      {
        name: "Sprint",
        path: "/sprint"
      }
    ]
  },
  mutations: {
    title: (state, title)=>{
      state.title = title
    }
  }
};
