import Vue from 'vue'
import Router from 'vue-router'
import CompanySearch from '@/pages/CompanySearch2'
import CompanyEditor from '@/pages/CompanyEditor'
import CompanyViewer from '@/pages/CompanyViewer'

Vue.use(Router)

export const CompanySearchRoute = 'company-search'
export const CompanyEditRoute = 'company-edit'
export const CompanyViewRoute = 'company-view'

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
    },
    {
      path: '/company-view',
      name: CompanyViewRoute,
      component: CompanyViewer
    }
  ]
})
