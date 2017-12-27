<template lang="pug">
  section.miwt.company-editor
    div.company-editor.prop-wrapper.prop-editor
        h1.page-header Edit Company: {{ company.name }}
        header.prop-header
        div.message-container.empty
        div.prop-body
            div.prop-column.left
            div.prop-column.right
                div.row
                    div.prop.user-entry-required.name
                        label(for="name-input") Name
                        input.val#name-input(type="text" :value="company.name" @input="evt => name = evt.target.value")
                div.row
                div.row
                    div.prop.website
                        label(for="website-input") Website
                        input.val#website-input(type="text" :value="company.website" @input="evt => name = evt.target.value")
        footer.prop-footer
            div.prop-footer-actions
                div.persistence-actions.bottom.actions
                    button.btn.save(title="Save the changes" type="button" @click="save") Save
                    button.btn.cancel(title="Reject the changes or acton", type="button" @click="cancel") Cancel
</template>


<script>
import { CompanyActions, CompanyStoreName } from '@/store/company'
import { CompanyViewRoute } from '@/router'

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
          this.name = company.name
          this.website = company.website
          return company
      }
  },
  methods: {
      cancel () {
          this.$router.push({ name: CompanyViewRoute, query: { company: this.company.id } })
      },
      async save () {
          let company = this.company
          company.name = this.name
          company.website = this.website
          await this.$store.dispatch(CompanyActions.save, company)
          this.$router.push({ name: CompanyViewRoute, query: { company: this.company.id } })
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
