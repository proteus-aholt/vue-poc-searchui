import Dexie from 'dexie'
import { CompanyStoreName } from './company'

const db = new Dexie('vue-poc-searchui')
db.version(1).stores({
    [CompanyStoreName]: '++id,name,website'
})

export default db
