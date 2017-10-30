import Vue from 'vue'
import Vuex from 'vuex'

import { CompanyStoreName } from './idb_setup'
import CompanyModule from './company'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        [CompanyStoreName]: CompanyModule
    }
})
