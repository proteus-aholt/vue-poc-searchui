import Vue from 'vue'
import EntityAction from './EntityAction'
import SearchConstraint from './SearchConstraint'
import SearchAction from './SearchAction'
import SearchUI from './SearchUI'
import ConstraintContainer from './ConstraintContainer'

Vue.component('app-entity-action', EntityAction)
Vue.component('app-search-constraint', SearchConstraint)
Vue.component(ConstraintContainer.tag, ConstraintContainer)
Vue.component('app-search-action', SearchAction)
Vue.component('app-search-ui', SearchUI)

export class ColumnDefinition {
    constructor (key, label, sortable, variant) {
        return {
            key: key || '',
            label: label || '',
            sortable: !!sortable,
            variant: variant || ''
        }
    }
}

export class ConstraintDefinition {
    constructor (key, label, val, placeholder) {
        return {
            key: key || '',
            label: label || '',
            val: val || '',
            placeholder: placeholder || ''
        }
    }
}
