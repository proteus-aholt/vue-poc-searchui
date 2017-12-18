import Vue from 'vue'
import Router from 'vue-router'
import CompanySearch from '@/pages/CompanySearch2'
import CompanyEditor from '@/pages/CompanyEditor'

Vue.use(Router)

export const CompanySearchRoute = 'company-search'
export const CompanyEditRoute = 'company-edit'

export default new Router({
  routes: [
    {
      path: '/',
      name: CompanySearchRoute,
      component: CompanySearch
    },
    {
      path: '/company-edit',
      name: CompanyEditRoute,
      component: CompanyEditor
    }
  ]
})
