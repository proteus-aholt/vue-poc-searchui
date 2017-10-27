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
        b-table.search-results(:busy.sync="search_opts.is_busy" :items="search_opts.search" :fields="search_opts.columns" :per-page="search_opts.per_page" :current_page="search_opts.current_page")
</template>

<script>
export default {
  name: 'search-ui',
  props: {
      search: Function,
      search_name: String,
      search_opts: Object
  }
}
</script>

