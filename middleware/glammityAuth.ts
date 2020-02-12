import { Middleware } from '@nuxt/types'
import { auth, firestore } from '@/plugins/firebase'

const middleware: Middleware = ({ route, redirect }) => {
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
    }
  })
}

export default middleware
