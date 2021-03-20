/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import cardsApi, { CreateCardPayload } from "../circle-lib/cardsApi";
import { v4 as uuidv4 } from 'uuid'
import openPGP from '../circle-lib/openpgp'
import paymentsApi, { CreateCardPaymentPayload } from "../circle-lib/paymentsApi";
import { NFTStorage, Blob } from 'nft.storage'
import atob from 'atob';
import * as dotenv from "dotenv";

dotenv.config();

 /**
 * Router Definition
 */

export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET

itemsRouter.get("/", async (req: Request, res: Response) => {
    res.status(200).send("It's working!")
  });

// POST /donate

itemsRouter.post("/donate", async (req: Request, res: Response) => {
  try {
    const card = await makeCreateCardCall(req.body)
    if (card && card.id) {
      const payment = await makeChargeCall(card.id, req.body);

      res.status(200).send(payment);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

const makeCreateCardCall = async (cardData: any): Promise<any> => {

    const payload: CreateCardPayload = {
      idempotencyKey: uuidv4(),
      expMonth: parseInt(cardData.expiry.month),
      expYear: parseInt(cardData.expiry.year),
      keyId: '',
      encryptedData: '',
      billingDetails: {
        line1: cardData.line1,
        line2: cardData.line2,
        city: cardData.city,
        district: cardData.district,
        postalCode: cardData.postalCode,
        country: cardData.country,
        name: cardData.name,
      },
      metadata: {
        phoneNumber: cardData.phoneNumber,
        email: cardData.email,
        sessionId: 'xxx',
        ipAddress: '172.33.222.1',
      },
    }

    try {
      const publicKey = await cardsApi.getPCIPublicKey()
      const cardDetails = {
        number: cardData.cardNumber.replace(/\s/g, ''),
        cvv: cardData.ccv,
      }

      const encryptedData = await openPGP.encrypt(cardDetails, publicKey)
      const { encryptedMessage, keyId } = encryptedData

      payload.keyId = keyId
      payload.encryptedData = encryptedMessage

      return await cardsApi.createCard(payload)
    } catch (error) {
      console.log(error)
      throw error
    }
}

const makeChargeCall = async (cardId: string, cardData: any): Promise<any> => {

    const amountDetail = {
      amount: cardData.amount,
      currency: 'USD',
    }
    const sourceDetails = {
      id: cardId,
      type: 'card',
    }

    const payload: CreateCardPaymentPayload = {
      idempotencyKey: uuidv4(),
      amount: amountDetail,
      verification: 'cvv',
      source: sourceDetails,
      description: cardData.description,
      metadata: {
        phoneNumber: cardData.phoneNumber,
        email: cardData.email,
        sessionId: 'xxx',
        ipAddress: '172.33.222.1',
      },
    }

    try {
      const cardDetails = { cvv: cardData.cvv }

      const publicKey = await cardsApi.getPCIPublicKey()
      const encryptedData = await openPGP.encrypt(cardDetails, publicKey)
      const { encryptedMessage, keyId } = encryptedData

      payload.keyId = keyId
      payload.encryptedData = encryptedMessage

      console.log(payload)

      const payment = await paymentsApi.createPayment(payload)

      return payment;

    } catch (error) {
      // console.log(error)
      throw error;
    }
}

// POST /store

// storage is done on the frontend for now because the nft.storage api only receives 'File' types and taht is not available in node

/* itemsRouter.post("/store", async (req: Request, res: Response) => {
  const apiKey = process.env.NFT_STORAGE;
  if (apiKey) {
    const client = new NFTStorage({ token: apiKey })

    const byteCharacters = atob(req.body.image);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const content = new File(req.body.image, 'test_1.png');

    // const content = new Blob(['hello world'])
    const cid = await client.storeDirectory([content])

    res.status(200).send(cid);
  }
}); */