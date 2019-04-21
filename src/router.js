import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Groups from './pages/Groups.vue'
import Projects from './pages/Projects.vue'
import Issues from './pages/Issues.vue'
import Issue from './pages/Issue.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/issues',
      component: Issues
    },
    {
      path: '/groups',
      component: Groups
    },
    {
      path: '/projects',
      component: Projects
    },
    {
      path: '/issue',
      component: Issue
    }
  ]
})
