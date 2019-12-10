import * as functions from 'firebase-functions';
const algoliasearch = require('algoliasearch');
import * as admin from 'firebase-admin';

// stripe
const cors = require('cors')({origin: true});
const stripe = require('stripe')(functions.config().stripe.secret_token);


admin.initializeApp(functions.config().firebase)
// Algoliaの認証情報
const ALGOLIA_APP_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
// 作成するIndexの名前
const ALGOLIA_INDEX_NAME = 'Facilities';
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);

exports.onProductCreated = functions.firestore.document("facilities/{id}").onCreate((snap: {data: any}, context) => {
  const algoliaObject = {
    objectID: context.params.id,
    name: snap.data().name,
    ruby: snap.data().ruby
  }
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  return index.saveObject(algoliaObject);
})

// stripe-fucntions
const stripeCharge = (request: functions.Request, response: functions.Response) => {

  const body = request.body;
  const amount = body.charge.amount;
  const currency = body.charge.currency;
  const description = 'グランピング支払い';
  const receipt_email = body.charge.email;
  const source = body.token.id;
  const charge = {amount, currency, description, receipt_email, source};

  stripe.charges.create(charge)
  .then((res: any) => {
      send(response, 200, {message: 'success！', result: res});
      console.log('charge success.');
  })
  .catch((err: any) => {
      send(response, 500, {error: err.message});
      console.log('charge failed.');
  });
}

function send(response: functions.Response, statusCode: number, body: any) {
  response.send({
    statusCode,
    data: JSON.stringify(body)
  });
}

exports.charge = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
      try {
          stripeCharge(request, response);
      } catch (error) {
          send(response, 500, {error: error.message});
      }
  });
});
