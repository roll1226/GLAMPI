import { auth } from '@/plugins/firebase'
import { Middleware } from '@nuxt/types'

// const middleware:Middleware = ({ route, store, redirect }) => {
//   auth.onAuthStateChanged((user) => {
//     if (! user && route.name !== 'login') redirect('/login')
//   })
// }

const middleware: Middleware = ({ route, store, redirect }) => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      redirect('/')
    } else {
      store.commit('login/IS_LOGIN', true)
    }
  })
}

export default middleware
