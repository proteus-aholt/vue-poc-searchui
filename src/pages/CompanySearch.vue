<template lang="pug">
  section.company-management
    h1 Companies
    app-search-ui(:search="search" search_name="company-search")
      app-entity-action(slot="entity-actions" name="add" label="Add" :on_click="start_add")
      app-search-constraint(slot="constraints" name="name" label="Name" placeholder="Search by Name" v-model="constraints.name")
      app-search-constraint(slot="constraints" name="website" label="Website" placeholder="Search by Website" v-model="constraints.website")
      app-search-action(slot="search-actions" name="search" label="Search" :on_click="search")
      app-search-action(slot="search-actions" name="reset" label="Reset" :on_click="reset")
</template>

<script>
export default {
  name: 'company-search',
  data () {
    return {
      constraints: {
        name: '',
        website: ''
      }
    }
  },
  methods: {
    start_add () {
      console.log('This is where I would start adding a company')
    },

    search () {
      // Perform the search
      console.log('Searching...')
      console.log(JSON.stringify(this.constraints))
    },

    reset () {
      this.constraints.name = ''
      this.constraints.website = ''
    }
  }
}
</script>

