import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
const algoliasearch = require('algoliasearch')

// メール設定
const nodemailer = require('nodemailer')
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password

// stripe
const cors = require('cors')({ origin: true })
const stripe = require('stripe')(functions.config().stripe.secret_token)

admin.initializeApp(functions.config().firebase)
// firestore定義
const firestore = admin.firestore()

// Algoliaの認証情報
const ALGOLIA_APP_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key
// 作成するIndexの名前
const ALGOLIA_INDEX_NAME = 'Facilities'
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)

exports.onProductCreated = functions.firestore
  .document('facilities/{id}')
  .onCreate((snap: { data: any }, context) => {
    const algoliaObject = {
      objectID: context.params.id,
      name: snap.data().name,
      ruby: snap.data().ruby
    }
    const index = client.initIndex(ALGOLIA_INDEX_NAME)
    return index.saveObject(algoliaObject)
  })

// stripe-fucntions
const stripeCharge = (
  request: functions.Request,
  response: functions.Response
) => {
  const body = request.body
  const amount = body.charge.amount
  const currency = body.charge.currency
  const description = 'グランピング支払い' // ここはあとで変えルカ
  const receiptEmail = body.charge.email
  const source = body.token.id
  const charge = { amount, currency, description, receiptEmail, source }

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

exports.charge = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    try {
      stripeCharge(request, response)
    } catch (error) {
      send(response, 500, { error: error.message })
    }
  })
})

const userRegist = async (
  request: functions.Request,
  response: functions.Response
) => {
  const body = request.body
  const uid = body.uid

  await firestore
    .collection('users')
    .doc(uid)
    .set(body.user)
    .then(() => {
      send(response, 200, { message: 'success！' })
    })
}

// ユーザ登録
exports.regist = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      await userRegist(request, response)
    } catch (error) {
      send(response, 500, { error: error.message })
    }
  })
})

// 管理者用のメールテンプレート
const adminContents = (data: {
  name: string
  checkIn: string
  checkOut: string
  plan: string
  option: string
  payment: string
  facility: string
  pay: number
}) => {
  let option = ''
  option = data.option
  if (data.option === '') option = '選んでいません'

  return `
    お名前：${data.name}様、こちらのご予約を承りました。

    <br />
    グランピング施設
      ${data.facility}

    <br />
    支払い方法
      ${data.payment}

    <br />
    支払い金額
      ${data.pay.toLocaleString()}

    <br />
    プラン
      ${data.plan}

    <br />
    オプション
      ${option}

    <br />
    支払い方法
      ${data.payment}

    <br />
    ${data.name}様が安らげる空間を提供いたします。

    <br />
    ----------------------------------------------------------------------------------------------------

    <br />
    こちらのご予約に見覚えがない場合はお問い合わせをお願いします。
    お問い合わせ先: 080-〇〇〇〇-〇〇〇〇
`
} // 管理者用のメールテンプレート
exports.sendReservationMail = functions.https.onRequest((req, res) => {
  /**
   * Here we're using Gmail to send
   */
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: gmailEmail, // google account email
      pass: gmailPassword // google account password
    }
  })

  cors(req, res, () => {
    const email = req.body.facilityReser.email

    const mailOptions = {
      from: 'GLAMPI <email@gmail.com>',
      to: email,
      subject: '予約承りました',
      html: adminContents(req.body.facilityReser)
    }
    // returning result
    transporter.sendMail(mailOptions, (err: any) => {
      if (err) {
        send(res, 500, { error: err })
      }
      send(res, 200, { message: 'success！' })
    })
  })
})

// exports.sendMail = functions.https.onCall((request, response) => {
//   cors(request, response, () => {
//     const adminMail = {
//       from: gmailEmail,
//       to: request.body.email,
//       subject: '予約を受け付けました。',
//       text: adminContents(request.body)
//     }

//     // 管理者へのメール送信
//     mailTransport.sendMail(
//       adminMail,
//       (e: any, response: functions.Response) => {
//         console.log(e)
//         send(response, 200, { message: 'success！' })
//       }
//     )
//   })
// })
