import * as Vuex from 'vuex'
import moment from 'moment'
import { firestore, fieldValue } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
}

export interface IFacility {
  info: [...string[]]
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
}

export interface IOption {
  title: string
  texts: [...string[]]
  src: string
  pay: number
  displayName: string
}

export interface IComment {
  date: string | undefined
  star: number
  text: string
  userName: string
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
}

export const state = (): IState => ({
  facility: {
    info: [],
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
  loading: false
})

export const mutations = {
  SET_FACILITY(state: IState, payload: IFacility) {
    state.facility = payload
  },

  SET_PLAN(state: IState, payload: IPlan) {
    state.plan.push(payload)
  },

  SET_COMMENT(state: IState, payload: IComment) {
    state.comments.unshift(payload)
  },

  SET_COMMENT_NOW(state: IState, payload: IComment) {
    if (state.comments.length !== 0) state.comments.unshift(payload)
  },

  SET_COMMENT_NEW(state: IState, payload: IComment) {
    state.comments.unshift(payload)
    state.comments.shift()
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
      info: [],
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

  async getUser(
    dispatch: ICommit,
    payload: { userUid: string; commentBox: ICommentBox; nowChange: boolean }
  ) {
    await firestore
      .collection('users')
      .doc(payload.userUid)
      .get()
      .then((user: any) => {
        let userName = user.data().nickname
        const userUserImg = user.data().userImg
        if (userName === '')
          userName = user.data().lastName + user.data().firstName

        const commentList = {
          date: payload.commentBox.date,
          star: payload.commentBox.star,
          text: payload.commentBox.text,
          userName,
          userImg: userUserImg
        }
        if (payload.nowChange) {
          dispatch.commit('SET_COMMENT_NOW', commentList)
        } else {
          dispatch.commit('SET_COMMENT', commentList)
        }
      })
  },

  async getComment(dispatch: ICommit, payload: { displayName: string }) {
    const facility = firestore.collection('facilities')
    dispatch.commit('RESET_COMMENT')
    await facility
      .where('displayName', '==', payload.displayName)
      .get()
      .then((snap: any) => {
        snap.forEach(async (doc: any) => {
          const facilityId = doc.id
          const comment = facility.doc(facilityId).collection('comments')

          await comment
            .orderBy('createdAt', 'asc')
            .get()
            .then((commentSnapshot) => {
              if (!commentSnapshot.empty) {
                commentSnapshot.forEach((commentDoc) => {
                  const comment = commentDoc.data()
                  const commentList = {
                    star: comment.star,
                    text: comment.text,
                    date: moment(comment.date).format('YYYY年MM月DD日')
                  }
                  dispatch.dispatch('getUser', {
                    userUid: comment.userId,
                    commentBox: commentList,
                    nowChange: false
                  })
                })
              }
            })
        })
      })
  },

  // async changeCommentData(dispatch: ICommit, payload: { facilityId: string }) {
  //   const facility = firestore.collection('facilities')
  //   await facility
  //     .doc(payload.facilityId)
  //     .collection('comments')
  //     .orderBy('createdAt', 'desc')
  //     .limit(1)
  //     .onSnapshot((commentSnapshot: any) => {
  //       if (!commentSnapshot.empty) {
  //         commentSnapshot.forEach((commentDoc: any) => {
  //           const comment = commentDoc.data()
  //           const commentList = {
  //             star: comment.star,
  //             text: comment.text,
  //             date: moment(comment.date).format('YYYY年MM月DD日')
  //           }
  //           dispatch.dispatch('getUser', {
  //             userUid: comment.userId,
  //             commentBox: commentList,
  //             nowChange: true
  //           })
  //         })
  //       }
  //     })
  // },

  async postComment(
    dispatch: ICommit,
    payload: {
      displayName: string
      rating: number
      comment: string
      uuid: string
      comments: IComment[]
    }
  ) {
    const date = new Date()
    await firestore
      .collection('facilities')
      .where('displayName', '==', payload.displayName)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach(async (doc) => {
            await firestore
              .collection('facilities')
              .doc(doc.id)
              .collection('comments')
              .add({
                createdAt: date,
                star: payload.rating,
                text: payload.comment,
                userId: payload.uuid
              })
              .then(() => {
                const commentBox = {
                  date: moment(date).format('YYYY年MM月DD日'),
                  star: payload.rating,
                  text: payload.comment
                }
                dispatch.dispatch('getUser', {
                  userUid: payload.uuid,
                  commentBox,
                  nowChange: false
                })
                dispatch.commit('CLEAR_COMMENT')
              })
          })
        }
      })
  }
}
