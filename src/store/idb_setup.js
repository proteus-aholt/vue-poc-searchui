import idb from 'idb'

export const CompanyStoreName = 'companies'

export default idb.open('vue-poc-searchui', 1, upgradeDB => {
    upgradeDB.createObjectStore(CompanyStoreName, { keyPath: 'id' })
})
