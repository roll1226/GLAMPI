import { Middleware } from '@nuxt/types'
import { auth } from '@/plugins/firebase'

// const middleware:Middleware = ({ route, store, redirect }) => {
//   auth.onAuthStateChanged((user) => {
//     if (! user && route.name !== 'login') redirect('/login')
//   })
// }

const middleware: Middleware = ({ store }) => {
  auth.onAuthStateChanged((user) => {
    if (user) store.commit('login/IS_LOGIN', true)
  })
}

export default middleware
