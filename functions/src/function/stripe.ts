import * as functions from 'firebase-functions'

// stripe
const cors = require('cors')({ origin: true })
const stripe = require('stripe')(functions.config().stripe.secret_token)

// stripe-fucntions
const stripeCharge = (
  request: functions.Request,
  response: functions.Response
) => {
  const body = request.body
  const amount = body.charge.amount
  const currency = body.charge.currency
  const description = 'グランピング支払い' // ここはあとで変えルカ
  const source = body.token.id
  const charge = {
    amount,
    currency,
    description,
    receipt_email: body.charge.email,
    source
  }

  stripe.charges
    .create(charge)
    .then((res: any) => {
      send(response, 200, { message: 'success！', result: res })
      console.log('charge success.')
    })
    .catch((err: any) => {
      send(response, 500, { error: err.message })
      console.log('charge failed.')
    })
}

function send(response: functions.Response, statusCode: number, body: any) {
  response.send({
    statusCode,
    data: JSON.stringify(body)
  })
}

// exports.charge =

module.exports = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    try {
      stripeCharge(request, response)
    } catch (error) {
      send(response, 500, { error: error.message })
    }
  })
})
