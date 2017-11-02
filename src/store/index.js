import Vue from 'vue'
import Vuex from 'vuex'

import CompanyModule, { CompanyStoreName } from './company'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        [CompanyStoreName]: CompanyModule
    }
})
