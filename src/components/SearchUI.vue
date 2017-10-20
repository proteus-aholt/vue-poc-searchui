<template lang="pug">
  b-form(@submit.native="perform_search")
    div.search
        div.search-bar
            span.constraints
                slot(v-for="constraint in constraints" :name="`${search_name}-constraint-${constraint.name}`")
                    span.constraint(v-if="constraint.type == 'simple' || !constraint.type")
                        label(:for="name") {{ constraint.label }}
                        b-form-input(:id="name" v-model="constraint.val" type="text" :placeholder="constraint.placeholder")
            span.actions.search-actions
                slot(v-for="action in search_actions" :name="`${search_name}-search-action-${action.name}`")
                    b-button(:id="name" :name="action.name" variant="outline-primary" type="submit") {{ action.label }}
</template>

<script>
export default {
  name: 'search-ui',
  props: {
      search: Function,
      search_name: String,
      constraints: Array,
      search_actions: Array
  },
  methods: {
      perform_search (evt) {
          this.search()
          evt.preventDefault()
      }
  }
}
</script>

