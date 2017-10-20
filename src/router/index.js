import Vue from 'vue'
import Router from 'vue-router'
import CompanySearch from '@/pages/CompanySearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'company-search',
      component: CompanySearch
    }
  ]
})
