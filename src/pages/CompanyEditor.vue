<template lang="pug">
  section.company-editor
    div.prop.name
        label(for="name-input") Name
        input#name-input(v-model="name" type="text")
    div.prop.website
        label(for="website-input") Website
        input#website-input(v-model="website" type="text")
    div.actions
        button(type="button" @click="save") Save
        button(type="button" @click="cancel") Cancel
</template>


<script>
import { CompanyStoreName } from '@/store/idb_setup'
import { CompanyActions } from '@/store/company'
import { CompanySearchRoute } from '@/router'

export default {
  name: 'company-edit',
  data () {
      return {
          name: '',
          website: ''
      }
  },
  computed: {
      company () {
          let company = this.$store.state[CompanyStoreName].company
          this.name = company.name || ''
          this.website = company.website || ''
          return company
      }
  },
  methods: {
      cancel () {
          this.$router.push({ name: CompanySearchRoute })
      },
      async save () {
          let company = this.company
          company.name = this.name
          company.website = this.website
          await this.$store.dispatch(CompanyActions.save, company)
          this.$router.push({ name: CompanySearchRoute })
      }
  },
  async beforeMount () {
      let company = this.$route.query.company
      await this.$store.dispatch(CompanyActions.get, company)
  }
}
</script>
