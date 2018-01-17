import async_db from './idb_setup'
import { ulid } from 'ulid'

export const CompanyStoreName = 'companies'

const CompanyBaseMutations = {
    setList: 'setList',
    setTotalCount: 'setTotalCount',
    setSearchContext: 'setSearchContext',
    setSelected: 'setSelected'
}

const CompanyBaseActions = {
    getDBState: 'getDBState',
    save: 'save',
    delete: 'delete',
    search: 'search',
    get: 'get'
}

export const CompanyMutations = {
    setList: `${CompanyStoreName}/${CompanyBaseMutations.setList}`,
    setTotalCount: `${CompanyStoreName}/${CompanyBaseMutations.setTotalCount}`,
    setSearchContext: `${CompanyStoreName}/${CompanyBaseMutations.setSearchContext}`,
    setSelected: `${CompanyStoreName}/${CompanyBaseMutations.setSelected}`
}

export const CompanyActions = {
    getDBState: `${CompanyStoreName}/${CompanyBaseActions.getDBState}`,
    save: `${CompanyStoreName}/${CompanyBaseActions.save}`,
    delete: `${CompanyStoreName}/${CompanyBaseActions.delete}`,
    search: `${CompanyStoreName}/${CompanyBaseActions.search}`,
    get: `${CompanyStoreName}/${CompanyBaseActions.get}`
}

export class Company {
    constructor (id) {
        if (typeof id !== 'undefined') {
            this._id = id
        } else {
            this._id = null
        }

        this._name = ''
        this._website = ''
    }

    get id () {
        return this._id
    }

    set id (id) {
        this._id = id
    }

    get name () {
        return this._name
    }

    set name (name) {
        this._name = name
    }

    get website () {
        return this._website
    }

    set website (website) {
        this._website = website
    }

    with (func) {
        return func(this)
    }

    isTransient () {
        return this.id === null
    }

    toJSON () {
        return {
            id: this.id || ulid(),
            name: this.name || '',
            website: this.website || ''
        }
    }

    static fromJSON (obj) {
        if (typeof obj === 'undefined' || !obj) {
            obj = {}
        }
        return new Company(obj.id).with(it => {
            it.name = obj.name || ''
            it.website = obj.website || ''
            return it
        })
    }
}

export default {
    namespaced: true,
    state: {
        companies: [],
        total: 0,
        search_context: {},
        company: new Company()
    },
    // Synchronous
    mutations: {
        [CompanyBaseMutations.setList] (state, list) {
            state.companies = list
        },
        [CompanyBaseMutations.setTotalCount] (state, count) {
            state.total = count
        },
        [CompanyBaseMutations.setSearchContext] (state, search_context) {
            state.search_context = search_context
        },
        [CompanyBaseMutations.setSelected] (state, company) {
            state.company = Company.fromJSON(company)
        }
    },
    // Asynchronous
    actions: {
        async [CompanyBaseActions.getDBState] (context) {
            context.dispatch(CompanyBaseActions.search, context.state.search_context)
        },

        async [CompanyBaseActions.save] (context, company) {
            let db = await async_db
            await db.transaction('rw', db.companies, async function () {
                await db.companies.put(company.toJSON())
            })
            await context.dispatch(CompanyBaseActions.search, context.state.search_context)
        },

        async [CompanyBaseActions.get] (context, id) {
            let db = await async_db
            let result = await db.transaction('r', db.companies, async function () {
                return await db.companies.where('id').equals(id).first()
            })
            context.commit(CompanyBaseMutations.setSelected, result)
        },

        async [CompanyBaseActions.search] (context, search_context) {
            let db = await async_db
            let per_page = search_context.per_page || 10
            let current_page = (search_context.current_page || 1) - 1
            let sort = search_context.sort || { column: 'name', direction: 'ASC' }
            sort.column = sort.column || 'name'
            sort.direction = sort.direction || 'ASC'
            let constraints = search_context.constraints || []

            let result = await db.transaction('r', db.companies, async function () {
                let col = db.companies.toCollection()
                if (sort.direction === 'DESC') {
                    col = col.reverse()
                }
                return (await col.sortBy(sort.column)).map(Company.fromJSON)
            })
            constraints
                .filter(constraint => !!constraint.key)
                .filter(constraint => typeof constraint.val !== 'undefined' && constraint.val !== '')
                .forEach(constraint => {
                    result = result.filter(company => constraint.val.toLowerCase().startsWith(company[constraint.key]))
                })
            let total = result.length
            let offset = (per_page * current_page)
            result = result.slice(offset, offset + per_page)
            context.commit(CompanyBaseMutations.setSearchContext, {
                per_page: per_page,
                current_page: current_page,
                sort: sort,
                constraints: constraints
            })
            context.commit(CompanyBaseMutations.setList, result)
            context.commit(CompanyBaseMutations.setTotalCount, total)
        }
    }
}
