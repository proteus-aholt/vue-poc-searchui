<template lang="pug">
  section.miwt.company-viewer
    h1.page-header View Company: {{ company.name }}
    div.company-info
        div.company-view.prop-wrapper.prop-viewer
            header.prop-header
            div.prop-body
                div.company-value-viewer
                    div.prop-column.left
                    div.prop-column.right
                        div.row
                            div.prop.name
                                label Name
                                span {{ company.name }}
                        div.row
                            div.prop.website
                                label Website
                                span {{ company.website }}
            footer.prop-footer
                div.prop-footer.actions
                    div.persistence-actions.bottom.actions
                        button.btn.edit(title="Edit" type="button" @click="edit") Edit
                        button.btn.back(title="Back" type="button" @click="back") Back
</template>

<script>
import { CompanyActions, CompanyStoreName } from '@/store/company'
import { CompanySearchRoute, CompanyEditRoute } from '@/router'

export default {
  name: 'company-view',
  computed: {
      company () {
          let company = this.$store.state[CompanyStoreName].company
          company.name = company.name || ''
          company.website = company.website || ''
          return company
      }
  },
  methods: {
      back () {
          this.$router.push({ name: CompanySearchRoute })
      },
      edit () {
          this.$router.push({ name: CompanyEditRoute, query: { company: this.company.id } })
      }
  },
  async beforeMount () {
      let company = this.$route.query.company
      await this.$store.dispatch(CompanyActions.get, company)
  }
}
</script>

