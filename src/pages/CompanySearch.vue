<template lang="pug">
  section.company-management
    h1 Companies
    app-search-ui(:search="search" search_name="company-search" :constraints="search_constraints" :search_actions="search_actions")
</template>

<script>
export default {
  name: 'company-search',
  data () {
    return {
      search_constraints: [
        {
          name: 'name',
          label: 'Name',
          val: ''
        }
      ],
      search_actions: [
        {
          name: 'search',
          label: 'Search'
        }
      ]
    }
  },
  methods: {
    search () {
      // Perform the search
      console.log('Searching...')
      console.log(JSON.stringify(this.search_constraints))
    }
  }
}
</script>

