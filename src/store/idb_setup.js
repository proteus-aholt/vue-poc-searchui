import Dexie from 'dexie'

export default (async () => {
    const db = new Dexie('vue-poc-searchui')
    db.version(1).stores({
        companies: '&id,name,website'
    })
    return await db.open()
})()
