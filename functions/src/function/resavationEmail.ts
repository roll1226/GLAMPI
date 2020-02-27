import * as functions from 'firebase-functions'

// メール設定
const nodemailer = require('nodemailer')
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password

const cors = require('cors')({ origin: true })

function send(response: functions.Response, statusCode: number, body: any) {
  response.send({
    statusCode,
    data: JSON.stringify(body)
  })
}

// 管理者用のメールテンプレート
const registEmailText = (data: {
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

// exports.sendReservationMail =

module.exports = functions.https.onRequest((req, res) => {
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
      html: registEmailText(req.body.facilityReser)
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
