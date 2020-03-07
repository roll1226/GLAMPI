import * as Vuex from 'vuex'
import moment from 'moment'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
}

interface IUser {
  lastName: string
  firstName: string
  lastNameKana: string
  firstNameKana: string
  email: string
  postalCode: string
  streetAddress: string
  nickname: string
  comment: string
  sex: string
  birthday: string
}

interface IState {
  screen2: number
  lastName: string
  firstName: string
  lastNameKana: string
  firstNameKana: string
  address: string
  postalCode: string
  streetAddress: string
  email: string
  passwordBefore: string
  passwordAfter: string
  passwordCheck: string
  nickname: string
  comment: string
  sex: string
  birthday: string
  reservation: IFacility[]
  likes: IFacilityLike[]
  comments: IComment[]
  glammity: IGlammity[]
}

interface IUserData {
  facilityId: string
  plan: string
  totalPay: number
  status: string
}

interface ICommentData {
  star: number
  text: string
  createdAt: any
}

export interface IFacility {
  facilityName: string
  facilityImg: string
  address: string
  planName: string
  planPay: number
  introduction: string
  url: string
  status: string
}

export interface IFacilityLike {
  facilityName: string
  facilityImg: string
  introduction: string
  url: string
}

export interface IComment {
  facilityName: string
  star: number
  date: string | undefined
  text: string
  url: string
}

export interface IGlammity {
  glammityName: string
  glammityImg: string
  url: string
  introduction: string
  status: boolean
}

export const state = (): IState => ({
  screen2: 0,
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  address: '',
  postalCode: '',
  streetAddress: '',
  email: '',
  passwordBefore: '',
  passwordAfter: '',
  passwordCheck: '',
  nickname: '',
  comment: '',
  sex: '',
  birthday: '',
  reservation: [],
  glammity: [],
  likes: [],
  comments: []
})

export const mutations = {
  RESET_RESERVATION(state: IState) {
    state.reservation = []
  },

  RESET_GLAMMITY(state: IState) {
    state.glammity = []
  },

  RESET_LIKES(state: IState) {
    state.likes = []
  },

  RESET_COMMENTS(state: IState) {
    state.comments = []
  },

  SET_SCREEN_NUMBER(state: IState, payload: number) {
    state.screen2 = payload
  },

  SET_LAST_NAME(state: IState, payload: string) {
    state.lastName = payload
  },

  SET_FIRST_NAME(state: IState, payload: string) {
    state.firstName = payload
  },

  SET_LAST_NAME_KANA(state: IState, payload: string) {
    state.lastNameKana = payload
  },

  SET_FIRST_NAME_KANA(state: IState, payload: string) {
    state.firstNameKana = payload
  },

  SET_EMAIL(state: IState, payload: string) {
    state.email = payload
  },

  SET_STREETADDRESS(state: IState, payload: string) {
    state.streetAddress = payload
  },

  SET_POSTAL_CODE(state: IState, payload: string) {
    state.postalCode = payload
  },

  SET_COMMENT(state: IState, payload: string) {
    state.comment = payload
  },

  CHECK_PASSWORD_BEFORE(state: IState, payload: string) {
    state.passwordBefore = payload
  },

  CHECK_PASSWORD_AFTER(state: IState, payload: string) {
    state.passwordAfter = payload
  },

  CHECK_PASSWORDCHECK(state: IState, payload: string) {
    state.passwordCheck = payload
  },

  SET_NICKNAME(state: IState, payload: string) {
    state.nickname = payload
  },

  INITIAL_VALUE(state: IState, payload: IUser) {
    state.firstName = payload.firstName

    state.lastName = payload.lastName

    state.firstNameKana = payload.lastNameKana

    state.lastNameKana = payload.lastNameKana

    state.email = payload.email

    state.postalCode = payload.postalCode

    state.streetAddress = payload.streetAddress

    state.nickname = payload.nickname

    state.comment = payload.comment

    state.sex = payload.sex

    state.birthday = payload.birthday
  },
  SET_RESERVATION_FACILITY(
    state: IState,
    payload: {
      userData: IUserData
      facilityData: {
        name: string
        displayName: string
        info: string
        slider: [...string[]]
        streetAddress: [...string[]]
      }
    }
  ) {
    let address = ''

    for (
      let index = 0;
      index < payload.facilityData.streetAddress.length;
      index++
    ) {
      address += payload.facilityData.streetAddress[index]
    }

    const reservationList = {
      facilityName: payload.facilityData.name,
      address,
      planName: payload.userData.plan,
      planPay: payload.userData.totalPay,
      introduction: payload.facilityData.info,
      facilityImg: payload.facilityData.slider[0],
      url: payload.facilityData.displayName,
      status: payload.userData.status
    }

    state.reservation.push(reservationList)
  },
  SET_LIKES_FACILITY(
    state: IState,
    payload: {
      facilityData: {
        name: string
        displayName: string
        info: string
        slider: [...string[]]
      }
    }
  ) {
    const likesList = {
      facilityName: payload.facilityData.name,
      introduction: payload.facilityData.info,
      facilityImg: payload.facilityData.slider[0],
      url: payload.facilityData.displayName
    }
    state.likes.push(likesList)
  },

  SET_REVIEWS_COMMENT(
    state: IState,
    payload: {
      commentData: ICommentData
      facilityData: {
        name: string
        displayName: string
      }
    }
  ) {
    const commentList = {
      facilityName: payload.facilityData.name,
      url: payload.facilityData.displayName,
      text: payload.commentData.text,
      star: payload.commentData.star,
      date: moment(payload.commentData.createdAt.toDate()).format(
        'YYYY月M月D日'
      )
    }

    state.comments.push(commentList)
  },

  SET_GLAMMITY(
    state: IState,
    payload: {
      facilityData: {
        slider: [...string[]]
      }
      glammityData: {
        name: string
        comment: string
        checkOut: any
      }
      url: string
    }
  ) {
    const date = payload.glammityData.checkOut.replace('/', '-')
    const status = moment(date).isBefore(moment())

    const glammityList = {
      url: payload.url,
      glammityImg: payload.facilityData.slider[0],
      glammityName: payload.glammityData.name,
      introduction: payload.glammityData.comment,
      status
    }

    state.glammity.push(glammityList)
  }
}

export const actions = {
  async getUserData(dispatch: ICommit, payload: string) {
    const user = await firestore
      .collection('users')
      .doc(payload)
      .get()

    console.log(user.data())

    dispatch.commit('INITIAL_VALUE', user.data())
  },

  async getReservationFacility(dispatch: ICommit, payload: string) {
    const user = await firestore
      .collection('users')
      .doc(payload)
      .collection('reservations')
      .get()
    console.log(user.docs)
    for (let index = 0; index < user.size; index++) {
      dispatch.dispatch('getFacility', user.docs[index].data())
    }
  },
  async getFacility(
    dispatch: ICommit,
    payload: {
      facilityId: string
      plan: string
      totalpay: number
      status: string
    }
  ) {
    const facility = await firestore
      .collection('facilities')
      .where('displayName', '==', payload.facilityId)
      .get()

    dispatch.commit('SET_RESERVATION_FACILITY', {
      userData: payload,
      facilityData: facility.docs[0].data()
    })
  },

  async getGlammity(dispatch: ICommit, payload: string) {
    const user = await firestore
      .collection('users')
      .doc(payload)
      .collection('glammity')
      .get()
    console.log(user.docs)
    for (let index = 0; index < user.size; index++) {
      dispatch.dispatch('getGlammityFacility', user.docs[index].id)
    }
  },
  async getGlammityFacility(dispatch: ICommit, payload: string) {
    const glammity: any = await firestore
      .collection('glammity')
      .doc(payload)
      .get()

    const facility = await firestore
      .collection('facilities')
      .where('displayName', '==', glammity.data().facilityUrl)
      .get()

    dispatch.commit('SET_GLAMMITY', {
      facilityData: facility.docs[0].data(),
      glammityData: glammity.data(),
      url: payload
    })
  },

  async getLikes(dispatch: ICommit, payload: string) {
    const user = await firestore
      .collection('users')
      .doc(payload)
      .collection('likes')
      .get()
    console.log(user.docs)
    for (let index = 0; index < user.size; index++) {
      dispatch.dispatch('getLikesFacility', user.docs[index].id)
    }
  },
  async getLikesFacility(dispatch: ICommit, payload: string) {
    const facility = await firestore
      .collection('facilities')
      .where('displayName', '==', payload)
      .get()

    dispatch.commit('SET_LIKES_FACILITY', {
      facilityData: facility.docs[0].data()
    })
  },

  async getComments(dispatch: ICommit, payload: string) {
    const user = await firestore
      .collection('users')
      .doc(payload)
      .collection('comments')
      .get()
    console.log(user.docs)
    for (let index = 0; index < user.size; index++) {
      dispatch.dispatch('getCommentData', user.docs[index].data())
    }
  },
  async getCommentData(
    dispatch: ICommit,
    payload: {
      facilityUrl: string
      createdAt: string
      star: number
      text: string
    }
  ) {
    const facility = await firestore
      .collection('facilities')
      .where('displayName', '==', payload.facilityUrl)
      .get()

    dispatch.commit('SET_REVIEWS_COMMENT', {
      commentData: payload,
      facilityData: facility.docs[0].data()
    })
  }
}
