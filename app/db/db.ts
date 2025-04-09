import { openDB } from "idb"

const DB_NAME = 'productsDb'

export async function getDb() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('data')) {
                db.createObjectStore('data')
            }
        }
    })
}

export async function getCachedData(key: IDBKeyRange | IDBValidKey) {
    const db = await getDb()
    return db.get('data', key)
}

export async function cacheData(key: any, value: any) {
    const db = await getDb()
    return db.put('data', value, key)
}