import { get } from 'lodash'
import axios from 'axios'

import { getAPIHostname } from './apiTarget'

interface MetaData {
  email?: string
  phoneNumber?: string
  sessionId: string
  ipAddress: string
}

export interface UpdateCardPayload {
  keyId: string
  encryptedData: string
  expMonth: number
  expYear: number
}

export interface CreateCardPayload {
  idempotencyKey: string
  keyId: string
  encryptedData: string
  billingDetails: {
    name: string
    city: string
    country: string
    line1: string
    line2: string
    district: string
    postalCode: string
  }
  expMonth: number
  expYear: number
  metadata: MetaData
}

interface PublicKey {
  keyId: string
  publicKey: string
}

const instance = axios.create({
  baseURL: getAPIHostname(),
})

/**
 * Global error handler:
 * Intercepts all axios reponses and maps
 * to errorHandler object
 */
instance.interceptors.response.use(
  function (response) {
    if (get(response, 'data.data')) {
      return response.data.data
    }
    return response
  },
  function (error) {
    let response = get(error, 'response')
    if (!response) {
      response = error.toJSON()
    }
    return Promise.reject(response)
  }
)

const nullIfEmpty = (prop: string | undefined) => {
  if (prop !== undefined && prop.trim() === '') {
    return undefined
  }
  return prop
}

/** Returns the axios instance */
function getInstance() {
  return instance
}

/**
 * Returns a public key used to encrypt card details
 *
 * @returns Promise<PublicKey> {"keyId": "key1", "publicKey": "LS0tLS1CRUdJTiBQR1A..." }
 */
function getPCIPublicKey() {
  const url = '/v1/encryption/public'

  try {
    return instance.get<PublicKey>(url, { headers: { Authorization: `Bearer ${process.env.CIRCLE_API_KEY}` }})
  } catch(error) {
    console.log(error)
    return error
  }
}

/**
 * Get Card
 * @param {String} cardId
 */
function getCardById(cardId: string) {
  const url = `/v1/cards/${cardId}`

  return instance.get(url, { headers: { Authorization: `Bearer ${process.env.CIRCLE_API_KEY}` }})
}

/**
 * Get Cards
 * @param {String} pageBefore
 * @param {String} pageAfter
 * @param {String} pageSize
 */
function getCards(pageBefore: string, pageAfter: string, pageSize: string) {
  const queryParams = {
    pageBefore,
    pageAfter,
    pageSize,
  }

  const url = '/v1/cards'

  return instance.get(url, { params: queryParams, headers: { Authorization: `Bearer ${process.env.CIRCLE_API_KEY}` } })
}

/**
 * Create Card
 * @param {*} payload (contains form data and encrypted card details)
 */
function createCard(payload: CreateCardPayload) {
  const url = '/v1/cards'
  if (payload.metadata) {
    payload.metadata.phoneNumber = nullIfEmpty(payload.metadata.phoneNumber)
  }
  try {
    return instance.post(url, payload, { headers: { Authorization: `Bearer ${process.env.CIRCLE_API_KEY}` }})
  } catch (error) {
    console.log(error)
    throw error
  }
}

/**
 * Update card
 *
 * @param {String} cardId
 * @returns Promise
 */
function updateCard(cardId: string, payload: UpdateCardPayload) {
  return instance.put(`/v1/cards/${cardId}`, payload, { headers: { Authorization: `Bearer ${process.env.CIRCLE_API_KEY}` }})
}

export default {
  getInstance,
  getPCIPublicKey,
  getCards,
  getCardById,
  createCard,
  updateCard,
}
