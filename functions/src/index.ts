import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp(functions.config().firebase)

const funcs = {
  onProductCreated: './function/algolia',
  charge: './function/stripe',
  regist: './function/userRegist',
  sendReservationMail: './function/resavationEmail',
  sendTextMail: './function/testEmail',
  facilityRegist: './function/facilityRegist'
}

const loadFunctions = (funcsObj: any) => {
  console.log('loadFunctions ' + process.env.FUNCTION_NAME)
  for (const name in funcsObj) {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name) {
      exports[name] = require(funcsObj[name])
    }
  }
}

loadFunctions(funcs)
