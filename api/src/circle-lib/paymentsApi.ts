import { get } from 'lodash'
import axios from 'axios'

import { getAPIHostname } from './apiTarget'

interface MetaData {
  email: string
  phoneNumber?: string
  sessionId: string
  ipAddress: string
}

export interface CreateCardPaymentPayload extends BasePaymentPayload {
  verification?: string
  keyId?: string
  encryptedData?: string
}

export interface BasePaymentPayload {
  idempotencyKey: string
  amount: {
    amount: string
    currency: string
  }
  source: {
    id: string
    type: string
  }
  description: string
  metadata: MetaData
}

export interface RefundPaymentPayload {
  idempotencyKey: string
  amount: {
    amount: string
    currency: string
  }
  reason: string | undefined
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
  if (prop === '') {
    return undefined
  }
  return prop
}

/** Returns the axios instance */
function getInstance() {
  return instance
}

/**
 * Returns a public key used to encryption
 *
 * @returns Promise<PublicKey> {"keyId": "key1", "publicKey": "LS0tLS1CRUdJTiBQR1A..." }
 */
function getPCIPublicKey() {
  const url = '/v1/encryption/public'

  return instance.get<PublicKey>(url)
}

/**
 * Cancel a payment
 * @param {String} id
 */
function cancelPayment(id: string, payload: any) {
  const url = `/v1/payments/${id}/cancel`

  return instance.post(url, payload)
}

/**
 * Create payment
 * @param {*} payload (contains form data and encrypted payment details)
 */
function createPayment(payload: BasePaymentPayload) {
  const url = '/v1/payments'
  if (payload.metadata) {
    payload.metadata.phoneNumber = nullIfEmpty(payload.metadata.phoneNumber)
  }
  return instance.post(url, payload)
}

/**
 * Get payments
 * @param {String} settlementId
 * @param {String} from
 * @param {String} to
 * @param {String} pageBefore
 * @param {String} pageAfter
 * @param {String} pageSize
 */
function getPayments(
  settlementId: string,
  from: string,
  to: string,
  pageBefore: string,
  pageAfter: string,
  pageSize: string
) {
  const queryParams = {
    settlementId: nullIfEmpty(settlementId),
    from: nullIfEmpty(from),
    to: nullIfEmpty(to),
    pageBefore: nullIfEmpty(pageBefore),
    pageAfter: nullIfEmpty(pageAfter),
    pageSize: nullIfEmpty(pageSize),
  }

  const url = '/v1/payments'

  return instance.get(url, { params: queryParams, headers: { Authorization: `Bearer ${process.env.CIRCLE_API_KEY}` } })
}

/**
 * Get a payment
 * @param {String} id
 */
function getPaymentById(id: string) {
  const url = `/v1/payments/${id}`

  return instance.get(url, { headers: { Authorization: `Bearer ${process.env.CIRCLE_API_KEY}` }})
}

/**
 * Refund a payment
 * @param {String} id
 */
function refundPayment(id: string, payload: RefundPaymentPayload) {
  const url = `/v1/payments/${id}/refund`
  payload.reason = nullIfEmpty(payload.reason)
  return instance.post(url, payload, { headers: { Authorization: `Bearer ${process.env.CIRCLE_API_KEY}` }})
}

/**
 * Get balance
 */
function getBalance() {
  const url = '/v1/balances'
  return instance.get(url, { headers: { Authorization: `Bearer ${process.env.CIRCLE_API_KEY}` }})
}

/**
 * Get reversals
 * @param {String} from
 * @param {String} to
 * @param {String} pageBefore
 * @param {String} pageAfter
 * @param {String} pageSize
 */
function getReversals(
  from: string,
  to: string,
  pageBefore: string,
  pageAfter: string,
  pageSize: string
) {
  const queryParams = {
    from: nullIfEmpty(from),
    to: nullIfEmpty(to),
    pageBefore: nullIfEmpty(pageBefore),
    pageAfter: nullIfEmpty(pageAfter),
    pageSize: nullIfEmpty(pageSize),
  }

  const url = '/v1/reversals'

  return instance.get(url, { params: queryParams, headers: { Authorization: `Bearer ${process.env.CIRCLE_API_KEY}` } })
}

export default {
  getInstance,
  cancelPayment,
  createPayment,
  getPayments,
  getPaymentById,
  getPCIPublicKey,
  refundPayment,
  getBalance,
  getReversals,
}
