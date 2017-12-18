<template lang="pug">
  b-form
    slot
    div.search
        div.actions.entity-actions
            slot(name="entity-actions")
        div.search-bar
            slot(name="constraints")
            span.actions.search-actions
                slot(name="search-actions")
        b-table.search-results(ref="table" :busy.sync="search_opts.is_busy" :items="search_opts.search" :fields="search_opts.columns" :per-page="search_opts.per_page" :current_page="search_opts.current_page")
</template>

<script>
import ConstraintContainer from '@/components/search-ui/ConstraintContainer'

function parseSlots (component) {
    let slots = component.$slots

    // Make sure the named slots are instantiated
    slots.constraints = slots.constraints || []
    slots['search-actions'] = slots['search-actions'] || []
    slots['entity-actions'] = slots['entity-actions'] || []

    // Map the components in the defalt slot into the named slots
    slots.default.map(vn => {
        switch (vn.componentOptions.tag) {
            case ConstraintContainer.tag:
                return { key: 'constraints', vn: vn }
            case 'app-entity-action':
                return { key: 'entity-actions', vn: vn }
            case 'app-search-action':
                return { key: 'search-actions', vn: vn }
            default:
                return { key: 'default', vn: vn }
        }
    }).forEach(mapping => slots[mapping.key].push(mapping.vn))

    // Clear out the default slot, we don't want to render anything in it.
    slots.default = undefined

    return slots
}

export default {
  name: 'search-ui',
  props: {
      search: Function,
      search_name: String,
      search_opts: Object
  },
  methods: {
      triggerSearch () {
          this.$refs.table.refresh()
      },
      reset () {
          this.$refs.constraints.reset()

          this.triggerSearch()
      }
  },
  beforeMount () {
      this.$slots = parseSlots(this)
  }
}
</script>

