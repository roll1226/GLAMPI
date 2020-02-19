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
const textMailContents = () => {
  return `
    テストメールです。

    <br />
    ----------------------------------------------------------------------------------------------------

    <br />
    こちらのご予約に見覚えがない場合はお問い合わせをお願いします。
    お問い合わせ先: 080-〇〇〇〇-〇〇〇〇
`
} // 管理者用のメールテンプレート

// exports.sendTextMail =

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
    const email = req.body.email

    const mailOptions = {
      from: 'GLAMPI <email@gmail.com>',
      to: email,
      subject: 'テストメールです。',
      html: textMailContents()
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
