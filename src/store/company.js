import async_db, { CompanyStoreName } from './idb_setup'

const CompanyBaseMutations = {
    setList: 'setList',
    setSearchContext: 'setSearchContext'
}

const CompanyBaseActions = {
    getDBState: 'getDBState',
    add: 'add',
    delete: 'delete',
    update: 'update',
    search: 'search'
}

export const CompanyMutations = {
    setList: `${CompanyStoreName}/${CompanyBaseMutations.setList}`,
    setSearchContext: `${CompanyStoreName}/${CompanyBaseMutations.setSearchContext}`
}

export const CompanyActions = {
    getDBState: `${CompanyStoreName}/${CompanyBaseActions.getDBState}`,
    add: `${CompanyStoreName}/${CompanyBaseActions.add}`,
    delete: `${CompanyStoreName}/${CompanyBaseActions.delete}`,
    update: `${CompanyStoreName}/${CompanyBaseActions.update}`,
    search: `${CompanyStoreName}/${CompanyBaseActions.search}`
}

export class Company {
    constructor (name, website, id) {
        if (typeof id !== 'undefined') {
            this._id = id
        }
        this._name = name
        this._website = website
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

    toJSON () {
        return {
            id: this._id,
            name: this._name,
            website: this._website
        }
    }

    static fromJSON (obj) {
        return new Company(obj.name, obj.website, obj.id)
    }
}

export default {
    namespaced: true,
    state: {
        companies: [],
        search_context: {}
    },
    // Synchronous
    mutations: {
        [CompanyBaseMutations.setList] (state, list) {
            state.companies = list
        },
        [CompanyBaseMutations.setSearchContext] (state, search_context) {
            state.search_context = search_context
        }
    },
    // Asynchronous
    actions: {
        async [CompanyBaseActions.getDBState] (context) {
            context.dispatch(CompanyBaseActions.search, context.state.search_context)
        },

        async [CompanyBaseActions.save] (context, company) {
            let db = await async_db
            await db.transaction('rw', db[CompanyStoreName], async function () {
                await db[CompanyStoreName].put(company.toJSON())
            })
            await context.dispatch(CompanyBaseActions.search, context.state.search_context)
        },

        async [CompanyBaseActions.search] (context, search_context) {
            let db = await async_db
            let per_page = search_context.per_page || 10
            let current_page = search_context.current_page || 1
            let sort = search_context.sort || { column: 'name', direction: 'ASC' }
            sort.column = sort.column || 'name'
            sort.direction = sort.direction || 'ASC'
            let constraints = search_context.constraints || []

            let companies_table = db[CompanyStoreName]
            let result = await db.transaction('r', companies_table, async function () {
                let col = companies_table
                constraints.filter(c => typeof c.val !== 'undefined' && c.val.length > 0).forEach((c, idx) => {
                    if (idx === 0) {
                        col = col.where(c.key).startsWith(c.val)
                    } else {
                        col = col.and(com => {
                            let comVal = com[c.key]
                            if (typeof comVal === 'undefined' || comVal.length === 0) return false
                            else return comVal.toLowerCase().startsWith(c.val.toLowerCase())
                        })
                    }
                })
                if (sort.direction === 'DESC') {
                    col = col.reverse()
                }
                return (await col.limit(per_page).offset(current_page * per_page).sortBy(sort.column)).map(Company.fromJSON)
            })

            context.commit(CompanyBaseMutations.setSearchContext, {
                per_page: per_page,
                current_page: current_page,
                sort: sort,
                constraints: constraints
            })
            context.commit(CompanyBaseMutations.setList, result)
        }
    }
}
