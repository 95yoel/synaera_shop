import { API_URL as url, API_KEY as apiKey } from "environment";
import { getCachedData, cacheData } from "../db/db";

const CACHE_KEY = 'products';

export async function getProducts() {
  
  // Verify if db exists
  const cached = await getCachedData(CACHE_KEY)

  if (cached) {
    console.log('Usando productos desde IndexedDB')
    return cached
  }

  // if db doesn't exist
  try {
    const res = await fetch(url, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    })

    if (!res.ok) {
      throw new Error(`Error al obtener productos: ${res.status}`)
    }

    const data = await res.json()
    console.log('Productos obtenidos del backend:', data)

    // Store on indexedDB
    await cacheData(CACHE_KEY, data)
    return data

  } catch (error) {
    console.error('Error al hacer fetch de productos:', error)
    throw error
  }
}
