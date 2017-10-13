import ulid from 'ulid'
import db, { CompanyStoreName } from './idb_setup'

const CompanyBaseMutations = {
    setList: 'setList',
    add: 'add',
    delete: 'delete',
    update: 'update'
}

const CompanyBaseActions = {
    getDBState: 'getDBState',
    add: 'add',
    delete: 'delete',
    update: 'update'
}

export const CompanyMutations = {
    add: `${CompanyStoreName}/${CompanyBaseMutations.add}`,
    setList: `${CompanyStoreName}/${CompanyBaseMutations.setList}`,
    delete: `${CompanyStoreName}/${CompanyBaseMutations.delete}`,
    update: `${CompanyStoreName}/${CompanyBaseMutations.update}`
}

export const CompanyActions = {
    getDBState: `${CompanyStoreName}/${CompanyBaseActions.getDBState}`,
    add: `${CompanyStoreName}/${CompanyBaseActions.add}`,
    delete: `${CompanyStoreName}/${CompanyBaseActions.delete}`,
    update: `${CompanyStoreName}/${CompanyBaseActions.update}`
}

export class Company {
    constructor (id) {
        this._id = (typeof id !== 'undefined' ? id : ulid())
    }

    get id () {
        return this._id
    }

    set id (id) {
        this._id = id
    }

    setFromObj (obj) {
        // Set properties from the object for update
    }

    toJSON () {
        return {
            id: this._id
        }
    }

    static fromJSON (obj) {
        return new Company(obj.id)
    }
}

export default {
    namespaced: true,
    state: {
        companies: []
    },
    // Synchronous
    mutations: {
        [CompanyBaseMutations.setList] (state, list) {
            state.companies = list
        },

        [CompanyBaseMutations.add] (state, company) {
            state.companies.push(company)
        },

        [CompanyBaseMutations.delete] (state, company) {
            state.companies = state.companies.filter(c => c.id !== company.id)
        },

        [CompanyBaseMutations.update] (state, company) {
            state.companies = state.companies.map(c => {
                if (c.id !== company.id) {
                    return c
                } else {
                    c.setFromObj(company)
                    return c
                }
            })
        }
    },
    // Asynchronous
    actions: {
        async [CompanyBaseActions.getDBState] (context) {
            let d = await db
            let ts = (await d.transaction(CompanyStoreName).objectStore(CompanyStoreName).getAll()).map(Company.fromJSON)
            context.commit(CompanyBaseMutations.setList, ts)
        },

        async [CompanyBaseActions.add] (context, company) {
            let d = await db
            let tx = d.transaction(CompanyStoreName, 'readwrite')
            tx.objectStore(CompanyStoreName).put(company.toJSON())
            await tx.complete
            context.commit(CompanyBaseMutations.add, company)
        }
    }
}
