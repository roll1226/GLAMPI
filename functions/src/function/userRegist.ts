import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const cors = require('cors')({ origin: true })
// firestore定義
const firestore = admin.firestore()

function send(response: functions.Response, statusCode: number, body: any) {
  response.send({
    statusCode,
    data: JSON.stringify(body)
  })
}
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

// exports.regist =

// ユーザ登録
module.exports = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      await userRegist(request, response)
    } catch (error) {
      send(response, 500, { error: error.message })
    }
  })
})
