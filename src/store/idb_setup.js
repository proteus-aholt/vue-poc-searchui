import Dexie from 'dexie'

export const CompanyStoreName = 'companies'

export default (async () => {
    const db = new Dexie('vue-poc-searchui')
    let stores = {}
    stores[CompanyStoreName] = '++id,name,website'
    db.version(1).stores(stores)
    return await db.open()
})()
