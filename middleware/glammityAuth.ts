import { Middleware } from '@nuxt/types'
import { auth, firestore } from '@/plugins/firebase'

const middleware: Middleware = ({ route, store, redirect }) => {
  auth.onAuthStateChanged(async (user: any) => {
    console.log(route.params.Glammity)
    if (user) {
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
    } else {
      redirect('/')
    }
  })
}

export default middleware
