<template lang="pug">
  section.company-management
    h1 Companies
    app-search-ui(ref="table" :search="search" search_name="company-search" :search_opts="search_opts")
      app-entity-action(name="add" label="Add" :on_click="start_add")
      viwt-searchui-constraints(:constraints="constraints")
      app-search-action(name="search" label="Search" :on_click="triggerSearch")
      app-search-action(name="reset" label="Reset" :on_click="reset")
</template>

<script>
import { CompanyActions, CompanyStoreName } from '@/store/company'
import { CompanyEditRoute } from '@/router'
import { ColumnDefinition, ConstraintDefinition } from '@/components/search-ui'

export default {
  name: 'company-search',
  data () {
    return {
      constraints: [
        new ConstraintDefinition('name', 'Name', '', 'Filter by Name'),
        new ConstraintDefinition('website', 'Website', '', 'Filter by Website')
      ],
      search_control: {
        is_busy: false,
        per_page: 10,
        current_page: 0

      }
    }
  },
  computed: {
    search_opts () {
      return {
        is_busy: this.search_control.is_busy,
        search: this.search,
        columns: [
          new ColumnDefinition('name', 'Name', true),
          new ColumnDefinition('website', 'Website', true)
        ],
        per_page: this.search_control.per_page,
        current_page: this.search_control.current_page
      }
    }
  },
  methods: {
    start_add () {
      this.$router.push({ name: CompanyEditRoute, query: { company: 'new' } })
    },

    triggerSearch () {
      return this.$refs.table.triggerSearch()
    },

    reset () {
      this.$refs.table.reset()
    },

    async search (ctx) {
      this.is_busy = true

      await this.$store.dispatch(CompanyActions.search, {
        per_page: ctx.perPage,
        current_page: ctx.currentPage,
        sort: {
          column: ctx.sortBy,
          direction: (ctx.sortDesc ? 'DESC' : 'ASC')
        },
        constraints: this.constraints
      })

      this.is_busy = false
      return this.$store.state[CompanyStoreName].companies
    }
  }
}
</script>

