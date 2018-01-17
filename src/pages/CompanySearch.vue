<template lang="pug">
    section.miwt.company-management
        h1.page-header Companies
        div.search-wrapper.company-search
            div.search
                div.actions.entity-actions
                    button.btn.add(title="Add" @click="add") Add
                div.search-bar
                    span.constraints
                        span.constraint
                            label Name
                            input.val(type="text" v-model="constraints.name")
                        span.constraint
                            label Website
                            input.val(type="text" v-model="constraints.website")
                    span.actions.search-actions
                        button.btn.search(title="Search" @click="search") Search
                        button.btn.reset(title="Reset changes to the original data" @click="reset") Reset
                div.pager.pager-search-results
                    div.pageable
                        div.miwt-table-con
                            table.search-results.miwt-table
                                thead
                                    tr
                                        th.action-column.first-column
                                            span.column-label &nbsp;
                                        th
                                            span.column-label
                                                a(href="#" title="Sort by Name" @click="toSort('name')")
                                                    span Name
                                                span.sort-indicator(v-bind:class="{'ascending': sort.dir === 'ASC', 'descending': sort.dir === 'DESC'}")
                                                    i.fa(v-if="sort.col !== 'name'") &nbsp;
                                                    i.fa(v-if="sort.col === 'name'" v-bind:class="{'fa-chevron-down': sort.dir === 'ASC', 'fa-chevron-up': sort.dir === 'DESC'}")
                                        th.last-column
                                            span.column-label
                                                a(href="#" title="Sort by Website" @click="toSort('website')")
                                                    span Website
                                                span.sort-indicator(v-bind:class="{'ascending': sort.dir === 'ASC', 'descending': sort.dir === 'DESC'}")
                                                    i.fa(v-if="sort.col !== 'website'") &nbsp;
                                                    i.fa(v-if="sort.col === 'website'" v-bind:class="{'fa-chevron-down': sort.dir === 'ASC', 'fa-chevron-up': sort.dir === 'DESC'}")
                                tbody.miwt-table-data
                                    tr(v-for="(company, i) in companies" v-bind:class="{'even': i % 2 === 0, 'odd': i % 2 !== 0, 'first': i === 0, 'last': i === companies.length - 1}")
                                        td.action-column.first-column
                                            div.actions
                                                button.btn.edit(type="button" @click="view(company)") View
                                        td {{ company.name }}
                                        td.last-column {{ company.website }}
                    div.pager-bottom(v-if="pager.pageCount > 1")
                        span.mp-controls.prev-controls.controls(v-if="pager.currentPage > 1")
                            a.control.first(href="#" title="Go back to the first page." @click="toPage(1)")
                                span.cl First
                            a.control.prev(href="#" title="Previous" @click="toPage(pager.currentPage - 1)")
                                span.cl Previous
                        span.pages.controls
                            template(v-for="page in range(1, pager.pageCount)")
                                a.page.first.before-selected(v-if="pager.currentPage !== 1 && page === 1" href="#" title="Go to page 1" @click="toPage(page)")
                                    span.cl.pl {{ page }}
                                a.page.last.after-selected(v-if="pager.currentPage !== pager.pageCount && page === pager.pageCount" href="#" :title="goToPageString(page)" @click="toPage(page)")
                                    span.cl.pl {{ page }}
                                span.selected-page.page(v-if="pager.currentPage === page" v-bind:class="{'first': pager.currentPage === 1, 'last': pager.currentPage === pager.pageCount}")
                                    span.pl {{ page }}
                        span.mp-controls.next-controls.controls(v-if="pager.currentPage < pager.pageCount")
                            a.control.next(href="#" title="Next" @click="toPage(pager.currentPage + 1)")
                                span.cl Next
                            a.control.last(href="#" title="Go to the last page." @click="toPage(pager.pageCount)")
                                span.cl Last
</template>

<script>
import { CompanyActions, CompanyStoreName } from '@/store/company'
import { CompanyViewRoute, CompanyEditRoute } from '@/router'

export default {
    name: 'company-search',
    data () {
        return {
            constraints: {
                name: '',
                website: ''
            },
            pager: {
                perPage: 5,
                pageCount: 1,
                currentPage: 1
            },
            sort: {
                col: 'name',
                dir: 'ASC'
            },
            companies: []
        }
    },
    methods: {
        goToPageString (page) {
            return `Go to page ${page}`
        },

        range (min, max) {
            let arr = []
            let j = 0
            for (let i = min; i <= max; i++) {
                arr[j] = i
                j++
            }
            return arr
        },

        add () {
            this.$router.push({ name: CompanyEditRoute, query: { company: 'new' } })
        },

        view (company) {
            this.$router.push({ name: CompanyViewRoute, query: { company: company.id } })
        },

        async toPage (page) {
            this.pager.currentPage = page
            await this.search()
        },

        async search () {
            await this.$store.dispatch(CompanyActions.search, {
                per_page: this.pager.perPage,
                current_page: this.pager.currentPage,
                sort: {
                    column: this.sort.col,
                    direction: this.sort.dir
                },
                constraints: [
                    { key: 'name', val: this.constraints.name },
                    { key: 'website', val: this.constraints.website }
                ]
            })

            this.companies = this.$store.state[CompanyStoreName].companies
            this.pager.pageCount = Math.ceil((this.$store.state[CompanyStoreName].total / this.pager.perPage))
            this.pager.currentPage = (this.pager.currentPage <= this.pager.pageCount ? this.pager.currentPage : 1)
        },

        async reset () {
            this.constraints.name = ''
            this.constraints.website = ''
            this.sort.col = 'name'
            this.sort.dir = 'ASC'
            this.pager.currentPage = 1

            await this.search()
        },

        async toSort (column) {
            if (column === this.sort.col) {
                this.sort.dir = (this.sort.dir === 'ASC' ? 'DESC' : 'ASC')
            } else {
                this.sort.col = column
                this.sort.dir = 'ASC'
            }

            await this.search()
        }
  },
  async beforeMount () {
      await this.search()
  }
}
</script>

<style lang="scss">
@import '../stylesheets/templates/template--base.scss';
</style>
