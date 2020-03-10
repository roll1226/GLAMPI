import { Middleware } from '@nuxt/types'
import { auth, firestore } from '@/plugins/firebase'

const middleware: Middleware = ({ route, store, redirect }) => {
  auth.onAuthStateChanged(async (user: any) => {
    console.log(route.name)
    if (user) {
      const facility = await firestore
        .collection('facilities')
        .where('email', '==', user.email)
        .get()

      console.log(user)

      if (facility.empty) {
        await auth.signOut()

        redirect('/officerAdminFacility/login')
        return
      }

      store.commit('adminLogin/SET_IS_LOGIN', true)

      redirect(`/officerAdminFacility/${facility.docs[0].data().displayName}`)
    }

    if (!user && route.name === 'officerAdminFacility-id') {
      store.commit('adminLogin/SET_IS_LOGIN', false)
      redirect('/officerAdminFacility/login')
    }
  })
}

export default middleware
