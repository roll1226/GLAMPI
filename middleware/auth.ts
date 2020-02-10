import { Middleware } from '@nuxt/types'
import { auth } from '@/plugins/firebase'

// const middleware:Middleware = ({ route, store, redirect }) => {
//   auth.onAuthStateChanged((user) => {
//     if (! user && route.name !== 'login') redirect('/login')
//   })
// }

const middleware: Middleware = ({ route, store, redirect }) => {
  auth.onAuthStateChanged((user: any) => {
    console.log(route.name)
    if (user) {
      store.commit('login/IS_LOGIN', true)
      store.commit('login/SET_USER_UID', user.uid)
    }
    if (!user && route.name === 'mypage-id') redirect('/')
  })
}

export default middleware
