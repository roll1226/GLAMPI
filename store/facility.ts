import * as Vuex from 'vuex'
import moment from 'moment'
import { firestore, fieldValue } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
  state: IState
}

export interface IFacility {
  info: ''
  email: string
  phoneNumber: string
  name: string
  slider: [...string[]]
  streetAddress: [...string[]]
}

export interface IPlan {
  details: [...string[]]
  pay: number
  planImage: string
  planTitle: string
  maxGuests: string
}

export interface IOption {
  title: string
  texts: [...string[]]
  src: string
  pay: number
  displayName: string
}

export interface ICommentDate {
  createdAt: any
  star: number
  text: string
  userId: string
}

export interface IComment {
  date: string | undefined
  star: number
  text: string
  userName: string
  userImg: string
}

interface IUser {
  firstName: string
  lastName: string
  nickname: string
  userImg: string
}

export interface ICommentBox {
  date: string | undefined
  star: number
  text: string
}

interface IState {
  facility: IFacility
  plan: IPlan[]
  comments: IComment[]
  options: IOption[]
  uuid: string
  like: boolean
  rating: number
  comment: string
  loading: boolean
  commentIdBox: [...string[]]
}

export const state = (): IState => ({
  facility: {
    info: '',
    email: '',
    phoneNumber: '',
    name: '',
    slider: [],
    streetAddress: []
  },

  uuid: '',
  plan: [],
  comments: [],
  options: [],
  like: false,

  rating: 0,
  comment: '',
  loading: false,

  commentIdBox: []
})

export const mutations = {
  SET_FACILITY(state: IState, payload: IFacility) {
    state.facility = payload
  },

  SET_PLAN(state: IState, payload: IPlan) {
    state.plan.push(payload)
  },

  SET_COMMENT(state: IState, payload: { message: ICommentDate; user: IUser }) {
    const list = {
      date: moment(payload.message.createdAt.toDate()).format('YYYY月M月D日'),
      star: payload.message.star,
      text: payload.message.text,
      userName:
        payload.user.nickname !== ''
          ? payload.user.nickname
          : payload.user.firstName + payload.user.lastName,
      userImg: payload.user.userImg
    }
    state.comments.unshift(list)
  },

  RESET_PlAN(state: IState) {
    state.plan = []
  },

  SET_OPTION(state: IState, payload: IOption[]) {
    state.options = payload
  },

  SET_UID(state: IState, payload: string) {
    state.uuid = payload
  },

  RESET_COMMENT(state: IState) {
    state.comments = []
    state.commentIdBox = []
  },

  SET_LIKE(state: IState, payload: boolean) {
    state.like = payload
  },

  SET_LOADING(state: IState, payload: boolean) {
    state.loading = payload
  },

  SET_RATING(state: IState, payload: number) {
    state.rating = payload
  },

  SET_COMMENTS(state: IState, payload: string) {
    state.comment = payload
  },

  RESET_FACILITY_INFO(state: IState) {
    state.facility = {
      info: '',
      email: '',
      phoneNumber: '',
      name: '',
      slider: [],
      streetAddress: []
    }
  },

  CLEAR_COMMENT(state: IState) {
    state.comment = ''
    state.rating = 0
    state.loading = false
  },

  SET_COMMENT_ID_BOX(state: IState, payload: string) {
    state.commentIdBox.push(payload)
  }
}

export const actions = {
  async catchFacility(dispatch: ICommit, payload: string) {
    const facilityFirebase = firestore.collection('facilities')

    dispatch.commit('RESET_PlAN', [])
    await facilityFirebase
      .where('displayName', '==', payload)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach(async (doc) => {
            dispatch.commit('SET_FACILITY', doc.data())
            const facilityId = doc.id
            dispatch.commit('SET_UID', facilityId)

            await facilityFirebase
              .doc(facilityId)
              .collection('plans')
              .get()
              .then((planSnapshot) => {
                if (!planSnapshot.empty) {
                  planSnapshot.forEach((planDoc) => {
                    dispatch.commit('SET_PLAN', planDoc.data())
                  })
                }
              })
          })
        }
      })
  },

  async catchUserLike(
    dispatch: ICommit,
    payload: { userId: string; facilityId: string }
  ) {
    const user = firestore
      .collection('users')
      .doc(payload.userId)
      .collection('likes')
      .doc(payload.facilityId)

    await user.get().then((likeFacility) => {
      if (likeFacility.exists) {
        dispatch.commit('SET_LIKE', true)
      } else {
        dispatch.commit('SET_LIKE', false)
        console.log('no')
      }
    })
  },

  async creatLike(
    dispatch: ICommit,
    payload: { userId: string; facilityId: string; facilityUid: string }
  ) {
    const user = firestore
      .collection('users')
      .doc(payload.userId)
      .collection('likes')
      .doc(payload.facilityId)

    await user.set({}).then(() => {
      firestore
        .collection('facilities')
        .doc(payload.facilityUid)
        .set(
          {
            like: fieldValue.increment(1)
          },
          { merge: true }
        )
        .then(() => {
          dispatch.commit('SET_LIKE', true)
        })
    })
  },

  async deleteLike(
    dispatch: ICommit,
    payload: { userId: string; facilityId: string; facilityUid: string }
  ) {
    const user = firestore
      .collection('users')
      .doc(payload.userId)
      .collection('likes')
      .doc(payload.facilityId)

    await user.delete().then(() => {
      firestore
        .collection('facilities')
        .doc(payload.facilityUid)
        .set(
          {
            like: fieldValue.increment(-1)
          },
          { merge: true }
        )
        .then(() => {
          dispatch.commit('SET_LIKE', false)
        })
    })
  },

  async getComment(dispatch: ICommit, payload: string) {
    await dispatch.commit('RESET_COMMENT')

    const facility = await firestore
      .collection('facilities')
      .where('displayName', '==', payload)
      .get()

    firestore
      .collection('facilities')
      .doc(facility.docs[0].id)
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .onSnapshot(async (messages) => {
        for (const message of messages.docs) {
          await dispatch.dispatch('getUser', {
            message: message.data(),
            messageId: message.id
          })
        }
      })
  },

  async getUser(
    dispatch: ICommit,
    payload: { message: ICommentDate; messageId: string }
  ) {
    if (dispatch.state.commentIdBox.includes(payload.messageId)) return

    dispatch.commit('SET_COMMENT_ID_BOX', payload.messageId)

    const user = await firestore
      .collection('users')
      .doc(payload.message.userId)
      .get()

    dispatch.commit('SET_COMMENT', {
      message: payload.message,
      user: user.data()
    })
  },

  async postComment(
    dispatch: ICommit,
    payload: {
      displayName: string
      rating: number
      comment: string
      uuid: string
    }
  ) {
    try {
      const facility = await firestore
        .collection('facilities')
        .where('displayName', '==', payload.displayName)
        .get()

      const date = new Date()

      const batch = firestore.batch()
      const facilityComment = firestore
        .collection('facilities')
        .doc(facility.docs[0].id)
        .collection('comments')
      const facilityCommentId = facilityComment.doc().id

      const userComment = firestore
        .collection('users')
        .doc(payload.uuid)
        .collection('comments')
      const userCommentId = userComment.doc().id

      batch.set(facilityComment.doc(facilityCommentId), {
        createdAt: date,
        star: payload.rating,
        text: payload.comment,
        userId: payload.uuid
      })

      batch.set(userComment.doc(userCommentId), {
        createdAt: date,
        star: payload.rating,
        text: payload.comment,
        facilityUrl: payload.displayName
      })
      await batch.commit()
    } catch (error) {
      console.log(error)
    }
    dispatch.commit('CLEAR_COMMENT')
  }
}
