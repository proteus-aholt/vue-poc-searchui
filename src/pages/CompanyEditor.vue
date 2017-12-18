<template lang="pug">
  section.miwt.company-editor
    div.prop.name
        label(for="name-input") Name
        input#name-input(:value="company.name" @input="evt => name = evt.target.value" type="text")
    div.prop.website
        label(for="website-input") Website
        input#website-input(:value="company.website" @input="evt => website = evt.target.value" type="text")
    div.actions
        button(type="button" @click="save") Save
        button(type="button" @click="cancel") Cancel
</template>


<script>
import { CompanyActions, CompanyStoreName } from '@/store/company'
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
          company.name = company.name || ''
          company.website = company.website || ''
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
          console.log('inserting company...')
          console.log(company)
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

<style lang="scss">
@import '../stylesheets/templates/template--base.scss';
</style>
