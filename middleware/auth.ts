import { Middleware } from '@nuxt/types'
import { auth, firestore } from '@/plugins/firebase'

// const middleware:Middleware = ({ route, store, redirect }) => {
//   auth.onAuthStateChanged((user) => {
//     if (! user && route.name !== 'login') redirect('/login')
//   })
// }

const middleware: Middleware = ({ route, store, redirect }) => {
  auth.onAuthStateChanged(async (user: any) => {
    console.log(route.name)
    if (user) {
      store.commit('login/IS_LOGIN', true)
      store.commit('login/SET_USER_UID', user.uid)

      if (route.name === 'glammity-Group-Glammity-glammityGroup') {
        const isUser = await firestore
          .collection('glammity')
          .doc(route.params.Glammity)
          .collection('member')
          .doc(String(user.uid))
          .get()

        console.log(isUser.data())
        if (!isUser.data()) {
          redirect('/')
        }
        store.commit('glammityGroup/SET_USER_STATES', isUser.data())
      }
    }
    if (
      (!user && route.name === 'mypage-id') ||
      (!user && route.name === 'glammity-Group-Glammity-glammityGroup')
    )
      redirect('/')
  })
}

export default middleware
