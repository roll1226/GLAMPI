<template>
  <div>
    <h1>
      firebaseテスト
    </h1>

    <input v-model="text" type="text" />
    <button @click="goFire">
      送信
    </button>
    <button @click="getFire">
      受信
    </button>
    <br />
    {{ text }}
    <div v-for="(texts, index) in gette" :key="index">
      <p>
        {{ texts.text }}
      </p>
      <p>
        {{ texts.createdAt }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { firestore } from '@/plugins/firebase'

@Component
export default class firebase extends Vue {
  public text?: string = ''
  public gette?: object[] = []

  goFire() {
    firestore
      .collection('test')
      .doc(`test2`)
      .set({
        text: this.text,
        createdAt: new Date()
      })
      .then(function() {
        console.log('Document successfully written!')
      })
      .catch(function(error) {
        console.error('Error writing document: ', error)
      })
  }

  getFire() {
    this.gette = []
    firestore
      .collection('test')
      .get()
      .then((docs) => {
        docs.docs.map((doc) => {
          if (this.gette) {
            this.gette.push(doc.data())
          }
        })
      })
    console.log(this.gette)
  }
}
</script>
