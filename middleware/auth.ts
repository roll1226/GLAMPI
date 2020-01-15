import { Middleware } from '@nuxt/types'
import { auth } from '@/plugins/firebase'

// const middleware:Middleware = ({ route, store, redirect }) => {
//   auth.onAuthStateChanged((user) => {
//     if (! user && route.name !== 'login') redirect('/login')
//   })
// }

const middleware: Middleware = ({ route, store, redirect }) => {
  auth.onAuthStateChanged((user) => {
    console.log(route.name)
    if (user) store.commit('login/IS_LOGIN', true)
    if (!user && route.name === 'mypage-id') redirect('/')
  })
}

export default middleware
