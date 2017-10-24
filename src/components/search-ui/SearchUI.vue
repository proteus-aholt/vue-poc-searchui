<template lang="pug">
  b-form
    div.search
        div.actions.entity-actions
            slot(name="entity-actions")
        div.search-bar
            span.constraints
                slot(name="constraints")
            span.actions.search-actions
                slot(name="search-actions")
</template>

<script>
export default {
  name: 'search-ui',
  props: {
      search: Function,
      search_name: String
  }
}
</script>

