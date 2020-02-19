import * as functions from 'firebase-functions'
const algoliasearch = require('algoliasearch')

// Algoliaの認証情報
const ALGOLIA_APP_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key
// 作成するIndexの名前
const ALGOLIA_INDEX_NAME = 'Facilities'
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)

// exports.onProductCreated =

module.exports = functions.firestore
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
