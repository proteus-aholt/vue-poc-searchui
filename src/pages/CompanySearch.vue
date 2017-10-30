<template lang="pug">
  section.company-management
    h1 Companies
    app-search-ui(:search="search" search_name="company-search" :search_opts="search_opts")
      app-entity-action(slot="entity-actions" name="add" label="Add" :on_click="start_add")
      app-search-constraint(slot="constraints" name="name" label="Name" placeholder="Search by Name" v-model="constraints.name")
      app-search-constraint(slot="constraints" name="website" label="Website" placeholder="Search by Website" v-model="constraints.website")
      app-search-action(slot="search-actions" name="search" label="Search" :on_click="search")
      app-search-action(slot="search-actions" name="reset" label="Reset" :on_click="reset")
</template>

<script>
import { CompanyStoreName } from '@/store/idb_setup'
import { CompanyActions } from '@/store/company'

export default {
  name: 'company-search',
  data () {
    return {
      constraints: {
        name: '',
        website: ''
      },
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
        columns: [],
        per_page: this.search_control.per_page,
        current_page: this.search_control.current_page
      }
    }
  },
  methods: {
    start_add () {
      console.log('This is where I would start adding a company')
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
        constraints: [
          { key: 'name', val: this.constraints.name },
          { key: 'website', val: this.constraints.website }
        ]
      })

      this.is_busy = false
      return this.$store.state[CompanyStoreName].companies
    },

    reset () {
      this.constraints.name = ''
      this.constraints.website = ''
    }
  }
}
</script>

